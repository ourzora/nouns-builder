import React, { useRef } from 'react'
import { validateFounder } from 'src/components/Fields/fields/founder'
import { useLayoutStore } from 'src/stores'
import { useFormStore } from 'src/stores/useFormStore'
import { shallow } from 'zustand/shallow'
import { getEnsAddress } from 'src/utils/ens'
import { allocationProps } from 'src/typings'
import { Formik, Form, FieldArray, FormikProps } from 'formik'
import { Button, Flex } from '@zoralabs/zord'
import FounderAllocationNew from 'src/components/Fields/Allocation/FounderAllocation'
import ContributionAllocationNew from 'src/components/Fields/Allocation/ContributionAllocation'
import {
  defaultBackButtonVariants,
  defaultFormButtonWithPrev,
} from 'src/components/Fields/styles.css'
import { Icon } from 'src/components/Icon'

interface FounderProps {
  title: string
}

export interface FounderAllocationFormValues {
  founderAllocation: allocationProps[]
}

interface ContributionAllocationFormValues {
  contributionAllocation: allocationProps[]
}

const Allocation: React.FC<FounderProps> = ({ title }) => {
  const formRef = useRef<FormikProps<FounderAllocationFormValues>>(null)
  const {
    founderAllocation,
    setFounderAllocation,
    setActiveSection,
    activeSection,
    setFulfilledSections,
  } = useFormStore(
    (state) => ({
      founderAllocation: state.founderAllocation,
      setFounderAllocation: state.setFounderAllocation,
      setActiveSection: state.setActiveSection,
      activeSection: state.activeSection,
      setFulfilledSections: state.setFulfilledSections,
    }),
    shallow
  )

  const { signerAddress } = useLayoutStore(
    (state) => ({
      signerAddress: state.signerAddress,
      provider: state.provider,
    }),
    shallow
  )

  const initialFounderValues =
    founderAllocation.length === 0
      ? [
          {
            founderAddress: signerAddress || '',
            allocation: '',
            endDate: '',
            maxAllocation: '',
          },
        ]
      : [
          {
            founderAddress: signerAddress || '',
            allocation: founderAllocation[0].allocation,
            endDate: founderAllocation[0].endDate,
            maxAllocation: founderAllocation[0].maxAllocation,
          },
          ...founderAllocation.slice(1),
        ]

  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  const handleSubmit = async ({ founderAllocation }: FounderAllocationFormValues) => {
    const foundAllocationPromises = founderAllocation.map((allocation) =>
      getEnsAddress(allocation.founderAddress)
    )

    const founderAllocationAddresses = await Promise.all(foundAllocationPromises)

    setFounderAllocation(
      founderAllocation.map((allocation, idx) => ({
        ...allocation,
        founderAddress: founderAllocationAddresses[idx],
      }))
    )

    setFulfilledSections(title)
    setActiveSection(activeSection + 1)
  }

  if (!signerAddress) return null

  return (
    <>
      <Formik
        initialValues={{ founderAllocation: initialFounderValues }}
        enableReinitialize
        validateOnBlur={false}
        innerRef={formRef}
        validateOnMount={true}
        validateOnChange={true}
        validationSchema={validateFounder(signerAddress)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <FieldArray name="founderAllocation">
              {({ remove, push }) => (
                <FounderAllocationNew
                  formik={formik}
                  touched={formik.touched}
                  values={formik.values}
                  errors={formik.errors}
                  removeFounderAddress={remove}
                  addFounderAddress={() =>
                    push({ founderAddress: '', allocation: '', endDate: '' })
                  }
                />
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>

      <ContributionAllocationNew />

      <Flex justify={'space-between'} mt={'x8'}>
        <Button
          justify={'center'}
          align={'center'}
          h={'x15'}
          minH={'x15'}
          minW={'x15'}
          type="button"
          onClick={handlePrev}
          className={defaultBackButtonVariants['default']}
          aria-label="Back"
        >
          <Icon id="arrowLeft" />
        </Button>
        <Button
          flex={1}
          width={'auto'}
          ml={'x2'}
          minH={'x15'}
          className={defaultFormButtonWithPrev}
          type="submit"
          onClick={() => formRef.current?.handleSubmit()}
        >
          Continue
        </Button>
      </Flex>
    </>
  )
}

export default Allocation
