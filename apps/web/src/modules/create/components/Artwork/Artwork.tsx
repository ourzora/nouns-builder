import React from 'react'
import {
  setUpArtworkFields,
  validateSetUpArtwork,
} from 'src/components/Fields/fields/artwork'
import TextArea from 'src/components/Fields/TextArea'
import { ArtworkUpload } from './ArtworkUpload'
import { useFormStore } from 'src/stores/useFormStore'
import { Formik, Form } from 'formik'
import { validationSchemaArtwork } from './Artwork.schema'

interface ArtworkProps {
  title: string
}

interface ArtworkFormValues {}

export const Artwork: React.FC<ArtworkProps> = ({ title }) => {
  const { setSetUpArtwork, setUpArtwork } = useFormStore()
  const initialValues = {
    projectDescription: setUpArtwork?.projectDescription || '',
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  return (
    // <Form
    //   initialValues={initialValues}
    //   validationSchema={validateSetUpArtwork}
    //   buttonText={'Continue'}
    //   enableReinitialize={true}
    //   fields={setUpArtworkFields}
    //   createSectionTitle={title}
    //   submitCallback={setSetUpArtwork}
    // />
    <Formik<ArtworkFormValues>
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={false}
      validateOnMount={true}
      validateOnChange={true}
      validationSchema={validationSchemaArtwork}
      onSubmit={setSetUpArtwork}
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
              formik.values[field.name] && formik.errors[field.name]
                ? formik.errors[field.name]
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
              formik.touched[field.name] && formik.errors[field.name]
                ? formik.errors[field.name]
                : undefined
            }
          />
        </Form>
      )}
    </Formik>
  )
}
