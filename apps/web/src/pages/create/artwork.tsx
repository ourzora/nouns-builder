import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  setUpArtworkFields,
  validateSetUpArtwork,
} from 'src/components/Fields/fields/artwork'
import { useFormStore } from 'src/stores/useFormStore'
import { CreateLayout } from 'src/modules/create/layouts'
import { setUpArtworkProps } from 'src/typings'
import { useRouter } from 'next/router'
import { CREATE_SECTIONS } from 'src/modules/create/constants'

const Artwork = () => {
  const router = useRouter()
  const { setSetUpArtwork, setUpArtwork } = useFormStore()
  const initialValues: Partial<setUpArtworkProps> = {
    projectDescription: setUpArtwork?.projectDescription || '',
    artwork: setUpArtwork?.artwork || [],
    filesLength: setUpArtwork?.filesLength || '',
  }

  const handleSubmitCallback = (values: setUpArtworkProps) => {
    setSetUpArtwork(values)
    router.push({
      pathname: '/create/deploy',
    })
  }

  return (
    <CreateLayout section={CREATE_SECTIONS.ARTWORK}>
      <Form
        initialValues={initialValues}
        validationSchema={validateSetUpArtwork}
        buttonText={'Continue'}
        enableReinitialize={true}
        fields={setUpArtworkFields}
        createSectionTitle={''}
        submitCallback={handleSubmitCallback}
      />
    </CreateLayout>
  )
}

export default Artwork
