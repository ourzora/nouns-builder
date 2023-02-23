import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  setUpArtworkFields,
  validateSetUpArtwork,
} from 'src/components/Fields/fields/artwork'
import { useFormStore } from 'src/stores/useFormStore'

interface ArtworkProps {
  title: string
}

export const Artwork: React.FC<ArtworkProps> = ({ title }) => {
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
