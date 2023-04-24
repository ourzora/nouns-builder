import * as Sentry from '@sentry/nextjs'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import React, { BaseSyntheticEvent, ChangeEventHandler, ReactElement } from 'react'

import { ArtworkPreview, ArtworkUpload as UploadComponent } from 'src/components/Artwork'
import { IPFSUpload, useArtworkPreview, useArtworkUpload } from 'src/hooks'
import { useArtworkStore } from 'src/modules/create-proposal/stores/useArtworkStore'

import { artworkPreviewPanel } from './ArtworkUpload.css'

const previewVariants = {
  closed: {
    right: 0,
    top: 0,
    x: '105%',
    opacity: 0,
    transition: {
      animate: 'easeInOut',
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      animate: 'easeInOut',
      duration: 0.5,
    },
  },
}

interface ArtworkFormProps {
  id: string
  value: any
  inputLabel: string | ReactElement
  onChange: ChangeEventHandler
  onBlur: ChangeEventHandler
  formik?: FormikProps<any>
  errorMessage?: any
  helperText?: string
}

export const ArtworkUpload: React.FC<ArtworkFormProps> = ({
  inputLabel,
  helperText,
  errorMessage,
  formik,
}) => {
  const {
    ipfsUpload,
    setSetUpArtwork,
    setUpArtwork,
    setIpfsUpload,
    isUploadingToIPFS,
    setIsUploadingToIPFS,
    orderedLayers,
    setOrderedLayers,
  } = useArtworkStore()
  const { artwork } = setUpArtwork

  const handleUploadSuccess = (ipfs: IPFSUpload[]) => {
    setIpfsUpload(ipfs)
    setIsUploadingToIPFS(false)
  }

  const handleUploadError = async (err: Error) => {
    setIpfsUpload([])
    setIsUploadingToIPFS(false)
    Sentry.captureException(err)
    await Sentry.flush(2000)
    return
  }

  const {
    images,
    fileInfo,
    filesArray,
    ipfsUploadError,
    uploadArtworkError,
    setUploadArtworkError,
    setFiles,
  } = useArtworkUpload({
    artwork,
    ipfsUpload,
    isUploadingToIPFS,
    onUploadStart: () => setIsUploadingToIPFS(true),
    onUploadSuccess: handleUploadSuccess,
    onUploadError: handleUploadError,
  })

  const { generateStackedImage, imagesToDraw, generatedImages, canvas } =
    useArtworkPreview({
      images,
      orderedLayers,
    })

  const handleUpload = (e: BaseSyntheticEvent) => {
    setUploadArtworkError(undefined)
    setFiles(e.currentTarget.files)
    setOrderedLayers([])
  }

  /*

    add artwork traits and properties to store

  */
  React.useMemo(() => {
    if (!fileInfo || !filesArray || !fileInfo.traits || !formik || uploadArtworkError)
      return

    setSetUpArtwork({
      artwork: fileInfo.traits,
      filesLength: fileInfo.filesLength,
    })
  }, [filesArray || fileInfo, uploadArtworkError])

  /*

    generate Stacked Image on Init

  */
  const [isReady, setIsReady] = React.useState<boolean>(false)
  React.useEffect(() => {
    setIsReady(!!setUpArtwork.artwork.length && !isUploadingToIPFS && !!imagesToDraw)
  }, [setUpArtwork.artwork, isUploadingToIPFS, imagesToDraw])

  React.useEffect(() => {
    if (isReady && !isUploadingToIPFS) {
      generateStackedImage()
    }
  }, [isReady, isUploadingToIPFS])

  const showPreview = setUpArtwork.artwork.length > 0

  return (
    <>
      <UploadComponent
        inputLabel={inputLabel}
        fileCount={setUpArtwork.filesLength}
        traitCount={setUpArtwork.artwork.length}
        helperText={helperText}
        errorMessage={errorMessage}
        onUpload={handleUpload}
        ipfsUploadError={ipfsUploadError}
        uploadArtworkError={uploadArtworkError}
        images={images}
        fileType={fileInfo?.fileType}
      />
      {showPreview && (
        <motion.div
          key={'preview-panel'}
          variants={previewVariants}
          initial={'closed'}
          animate={'open'}
          className={artworkPreviewPanel}
        >
          <ArtworkPreview
            canvas={canvas}
            generateStackedImage={generateStackedImage}
            images={images}
            generatedImages={generatedImages}
          />
        </motion.div>
      )}
    </>
  )
}
