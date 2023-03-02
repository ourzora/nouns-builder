import { Button, Flex } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import React from 'react'

import TextArea from 'src/components/Fields/TextArea'
import { Icon } from 'src/components/Icon'

import { useFormStore } from '../../stores'
import { ArtworkFormValues, validationSchemaArtwork } from './ArtworkForm.schema'
import { ArtworkUpload } from './ArtworkUpload'

interface ArtworkProps {
  title: string
}

export const Artwork: React.FC<ArtworkProps> = ({ title }) => {
  const {
    setUpArtwork,
    setFulfilledSections,
    activeSection,
    setActiveSection,
    ipfsUpload,
    isUploadingToIPFS,
  } = useFormStore()

  const initialValues = {
    projectDescription: setUpArtwork?.projectDescription || '',
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  const handlePrevious = () => {
    setActiveSection(activeSection - 1)
  }

  const handleSubmit = (_values: ArtworkFormValues) => {
    setFulfilledSections(title)
    setActiveSection(activeSection + 1)
  }

  return (
    <Formik<ArtworkFormValues>
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={false}
      validateOnMount={true}
      validateOnChange={true}
      validationSchema={validationSchemaArtwork}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <TextArea
            {...formik.getFieldProps('projectDescription')}
            inputLabel={'Collection Description'}
            formik={formik}
            id={'projectDescription'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.touched?.projectDescription && formik.errors?.projectDescription
                ? formik.errors?.projectDescription
                : undefined
            }
            placeholder={'Nouns is an experiment which combines...'}
          />

          <ArtworkUpload
            {...formik.getFieldProps('artwork')}
            inputLabel={'Artwork'}
            formik={formik}
            id={'artwork'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              'Builder uses folder hierarchy to organize your assets. Upload a single folder containing a subfolder for each trait. Each subfolder should contain every variant for that trait.'
            }
            errorMessage={
              formik.touched.artwork && formik.errors?.artwork
                ? formik.errors?.artwork
                : undefined
            }
          />

          <Flex justify={'space-between'} mt={'x8'}>
            <Button
              justify={'center'}
              align={'center'}
              borderRadius={'curved'}
              h={'x15'}
              minH={'x15'}
              minW={'x15'}
              variant={'secondary'}
              onClick={handlePrevious}
              aria-label="Back"
            >
              <Icon id="arrowLeft" />
            </Button>
            <Button
              flex={1}
              borderRadius={'curved'}
              width={'auto'}
              ml={'x2'}
              minH={'x15'}
              type="submit"
              disabled={
                !isEmpty(formik.errors) ||
                formik.isSubmitting ||
                isUploadingToIPFS ||
                ipfsUpload.length === 0
              }
            >
              Continue
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
