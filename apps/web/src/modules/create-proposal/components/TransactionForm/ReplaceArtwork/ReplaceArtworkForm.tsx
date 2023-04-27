import { Box, Button, Flex } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import React from 'react'

import { Uploading } from 'src/components/Uploading'
import { useArtworkStore } from 'src/modules/create-proposal/stores/useArtworkStore'

import { ArtworkUpload } from './ArtworkUpload'
import { ArtworkFormValues, validationSchemaArtwork } from './ReplaceArtworkForm.schema'

export interface ReplaceArtworkFormProps {
  handleSubmit: (values: ArtworkFormValues) => void
}

export const ReplaceArtworkForm: React.FC<ReplaceArtworkFormProps> = ({
  handleSubmit,
}) => {
  const { ipfsUpload, isUploadingToIPFS, setUpArtwork } = useArtworkStore()

  const initialValues = {
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  return (
    <Box w={'100%'}>
      <Uploading isUploadingToIPFS={isUploadingToIPFS} />
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
          <Flex as={Form} direction={'column'}>
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

            <Button
              mt={'x9'}
              variant={'outline'}
              borderRadius={'curved'}
              type="submit"
              disabled={
                !isEmpty(formik.errors) ||
                formik.isSubmitting ||
                isUploadingToIPFS ||
                ipfsUpload.length === 0
              }
            >
              Add Transaction to Queue
            </Button>
          </Flex>
        )}
      </Formik>
    </Box>
  )
}
