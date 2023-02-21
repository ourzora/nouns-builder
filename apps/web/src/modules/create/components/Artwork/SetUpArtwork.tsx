import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  setUpArtworkFields,
  validateSetUpArtwork,
} from 'src/components/Fields/fields/artwork'
import { useFormStore } from 'src/stores/useFormStore'

interface SetUpArtwork {
  title: string
}

const SetUpArtwork: React.FC<SetUpArtwork> = ({ title }) => {
  const { setSetUpArtwork, setUpArtwork } = useFormStore()
  const initialValues = {
    projectDescription: setUpArtwork?.projectDescription || '',
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validateSetUpArtwork}
      buttonText={'Continue'}
      enableReinitialize={true}
      fields={setUpArtworkFields}
      createSectionTitle={title}
      submitCallback={setSetUpArtwork}
    />
  )
}

export default SetUpArtwork
