import React, { useRef, useState } from 'react'
import { validationSchemaFounderAllocation } from 'src/components/Fields/fields/founder'
import { useLayoutStore } from 'src/stores'
import { useFormStore } from 'src/stores/useFormStore'
import { shallow } from 'zustand/shallow'
import { getEnsAddress } from 'src/utils/ens'
import { allocationProps } from 'src/typings'
import { Formik, Form, FieldArray, FormikProps } from 'formik'
import { Button, Flex } from '@zoralabs/zord'
import FounderAllocation from 'src/components/Fields/Allocation/FounderAllocation'
import ContributionAllocation from 'src/components/Fields/Allocation/ContributionAllocation'
import sum from 'lodash/sum'
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

const Allocation: React.FC<FounderProps> = ({ title }) => {
  const formRef = useRef<FormikProps<FounderAllocationFormValues>>(null)
  const [allocationError, setAllocationError] = useState(false)
  const {
    founderAllocation,
    contributionAllocation,
    setFounderAllocation,
    setActiveSection,
    activeSection,
    setFulfilledSections,
    vetoPower,
    auctionSettings: { auctionDuration },
  } = useFormStore(
    (state) => ({
      founderAllocation: state.founderAllocation,
      setFounderAllocation: state.setFounderAllocation,
      contributionAllocation: state.contributionAllocation,
      setActiveSection: state.setActiveSection,
      activeSection: state.activeSection,
      setFulfilledSections: state.setFulfilledSections,
      vetoPower: state.vetoPower,
      auctionSettings: state.auctionSettings,
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
          },
        ]
      : [
          {
            founderAddress: signerAddress || '',
            allocation: founderAllocation[0].allocation,
            endDate: founderAllocation[0].endDate,
          },
          ...founderAllocation.slice(1),
        ]

  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  const handleSubmit = async ({ founderAllocation }: FounderAllocationFormValues) => {
    setAllocationError(false)

    const totalAllocation = sum(
      [...founderAllocation, ...contributionAllocation].map(({ allocation }) =>
        Number(allocation)
      )
    )

    if (totalAllocation > 99) {
      setAllocationError(true)
      return
    }

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
      <Formik<FounderAllocationFormValues>
        initialValues={{ founderAllocation: initialFounderValues }}
        enableReinitialize
        validateOnBlur={false}
        innerRef={formRef}
        validateOnMount={true}
        validateOnChange={true}
        validationSchema={validationSchemaFounderAllocation(signerAddress)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <FieldArray name="founderAllocation">
              {({ remove, push }) => (
                <FounderAllocation
                  formik={formik}
                  auctionDuration={auctionDuration}
                  vetoPower={vetoPower}
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

      <ContributionAllocation />

      {allocationError && (
        <Flex mt={'x4'} color="negative">
          Oops, total allocation can not exceed 100%. Please double check the total of the
          allocation shares.
        </Flex>
      )}

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
