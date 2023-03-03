import { Button, Flex } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import Radio from 'src/components/Fields/Radio'
import {
  defaultBackButton,
  defaultFormButtonWithPrev,
} from 'src/components/Fields/styles.css'
import { Icon } from 'src/components/Icon'
import { isEmpty } from 'src/utils/helpers'

import { useFormStore } from '../stores'

interface VetoFormProps {
  title: string
}

interface VetoFromValues {
  vetoPower?: boolean
}

export const vetoValidationSchema = Yup.object().shape({
  vetoPower: Yup.boolean().required(),
})

export const VetoForm: React.FC<VetoFormProps> = ({ title }) => {
  const {
    vetoPower,
    setVetoPower,
    setFulfilledSections,
    activeSection,
    setActiveSection,
  } = useFormStore()
  const initialValues: VetoFromValues = {
    vetoPower: vetoPower,
  }

  const handleSubmit = (values: VetoFromValues) => {
    const vetoPower = values.vetoPower
    if (vetoPower !== undefined) {
      setVetoPower(vetoPower)
      setFulfilledSections(title)
      setActiveSection(activeSection + 1)
    }
  }

  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  return (
    <Formik<VetoFromValues>
      initialValues={initialValues}
      validationSchema={vetoValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validateOnMount={true}
      validateOnBlur={false}
    >
      {(formik) => (
        <Form>
          <Flex direction={'column'} w={'100%'}>
            <Radio
              {...formik.getFieldProps('vetoPower')}
              formik={formik}
              id={'vetoPower'}
              options={[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]}
            />
            <Flex>
              <Button
                justify={'center'}
                align={'center'}
                h={'x15'}
                minH={'x15'}
                minW={'x15'}
                onClick={() => handlePrev()}
                className={defaultBackButton}
                aria-label="Back"
              >
                <Icon id="arrowLeft" />
              </Button>
              <Button
                h={'x15'}
                className={defaultFormButtonWithPrev}
                type={'submit'}
                disabled={!isEmpty(formik.errors) || formik.isSubmitting}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                Continue
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
