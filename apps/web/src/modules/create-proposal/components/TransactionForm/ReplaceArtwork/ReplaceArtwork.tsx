import { Box, Button, Flex } from '@zoralabs/zord'
import { Form, Formik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import React from 'react'

import { useArtworkStore } from 'src/modules/create-proposal/stores/useArtworkStore'

import { ArtworkFormValues, validationSchemaArtwork } from './ArtworkForm.schema'
import { ArtworkUpload } from './ArtworkUpload'

export const ReplaceArtwork = () => {
  const { ipfsUpload, isUploadingToIPFS } = useArtworkStore()

  const initialValues = {
    artwork: [],
    filesLength: '',
  }

  const handleSubmit = (_values: ArtworkFormValues) => {}

  return (
    <Box w={'100%'}>
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
