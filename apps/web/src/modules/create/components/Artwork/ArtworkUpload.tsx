import AnimatedModal from 'src/components/Modal/AnimatedModal'
import {
  artworkPreviewGenerateButton,
  artworkPreviewImageWrapper,
  artworkPreviewPanel,
  defaultFileDownloadStyle,
  defaultHelperTextStyle,
  defaultInputLabelStyle,
  defaultUploadButtonStyle,
  defaultUploadStyle,
  dropAreaErrorStyle,
  dropAreaStyle,
  noneSelectedStyle,
  uploadErrorBox,
  uploadSuccessBox,
} from 'src/components/Fields/styles.css'
import { Box, Flex, Stack } from '@zoralabs/zord'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import React, {
  BaseSyntheticEvent,
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { LayerOrdering } from './LayerOrdering'
import { Playground } from './Playground'
import { getFetchableUrl, uploadDirectory } from 'ipfs-service'
import { useFormStore } from 'src/stores/useFormStore'
import {
  IPFSUpload,
  ImageProps,
  ImagesByTraitProps,
  SelectedTraitsProps,
} from 'src/typings'
import { sanitizeFileName } from 'src/utils/sanitize'
import { Icon } from 'src/components/Icon'
import * as Sentry from '@sentry/nextjs'

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

interface ArtworkUploadError {
  maxTraits?: string | null
  mime?: string | null
  directory?: string | null
  dimensions?: string | null
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
  } = useFormStore()
  const { setOrderedLayers } = useFormStore()

  const [uploadArtworkError, setUploadArtworkError] = useState<
    ArtworkUploadError | undefined
  >()

  const { artwork } = setUpArtwork

  /*   assign ipfs upload to property  */
  const images = React.useMemo(() => {
    if (isUploadingToIPFS) return

    if (Array.isArray(ipfsUpload) && artwork.length) {
      return ipfsUpload.reduce((acc: ImageProps[] = [], upload) => {
        const index = artwork?.map((e: any) => e.trait).indexOf(upload.trait)
        const childIndex = artwork[index]?.properties.indexOf(upload.name)
        const childName = artwork[index]?.properties[childIndex]

        acc.push({
          trait: artwork[index]?.trait,
          name: childName,
          cid: upload?.ipfs?.cid || '',
          uri: upload?.ipfs?.uri || '',
          url: encodeURI(
            getFetchableUrl(upload?.ipfs?.uri) +
              `/${upload.webkitRelativePath.split('/').slice(1).join('/')}` || ''
          ),
          path: upload.webkitRelativePath,
          content: upload?.content,
          blob: upload?.blob,
        })
        return acc
      }, [])
    }

    return []
  }, [artwork, ipfsUpload, isUploadingToIPFS])

  /*

    handle folder uploads on click

  */
  const dropInput = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (dropInput.current !== null) {
      dropInput.current.setAttribute('directory', '')
      dropInput.current.setAttribute('webkitdirectory', '')
    }
  }, [dropInput])

  /*

    prepare files

  */
  const [isProcessing, setIsProcessing] = React.useState<boolean | undefined>(undefined)
  const [files, setFiles] = React.useState<FileList | null>(null)
  const [filesArray, setFilesArray] = React.useState<File[] | null>(null)
  const fileInfo = React.useMemo(() => {
    if (!files) return

    setIsProcessing(true)
    const filesArray = Array.from(files).filter((file) => file.name !== '.DS_Store')
    // const acceptableMIME = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
    const acceptableMIME = ['image/png', 'image/svg+xml']

    let collectionName: string = ''
    let fileType: string = ''
    let traits: {
      trait: string
      properties: string[]
    }[] = []

    const reduced = filesArray.reduce((acc: any = [], cv, index) => {
      const paths = cv.webkitRelativePath.split('/')
      const collection = paths[0]
      const currentTrait = sanitizeFileName(paths[1])
      const currentProperty = sanitizeFileName(paths[2])

      /*  set collection name and file type */
      if (!collectionName) {
        collectionName = paths[0]
      }

      if (!fileType) {
        fileType = cv.type
      }

      /*  construct traits and properties  */
      if (traits.filter((trait) => trait.trait === currentTrait).length === 0) {
        traits.push({ trait: currentTrait, properties: [] })
      }

      if (!!traits) {
        traits
          .filter((trait) => trait.trait === currentTrait)[0]
          ?.properties?.push(currentProperty)
      }

      /* handle errors */

      // forward slashes seem to be converted to `:`
      // check for both folder and file name
      if (
        cv.name.includes(':') ||
        paths[2]?.includes(':') ||
        cv.name.split('.').length !== 2 ||
        paths[1].split('.').length !== 1
      ) {
        setUploadArtworkError({
          directory: `file or folder naming incorrect. must not include forward slashes or periods.`,
        })
        return
      }

      if (paths.length !== 3 || !paths) {
        if (paths.length > 3) {
          setUploadArtworkError({
            directory: `file or folder naming incorrect. must not include back slashes.`,
          })
          return
        }

        setUploadArtworkError({
          directory: `folder structure is incorrect. download the nouns example folder to compare.`,
        })
        return
      }

      if (cv.type.length && !acceptableMIME.includes(cv.type)) {
        setUploadArtworkError({
          mime: `${cv.type} is an unsupported file type - file: ${cv.name}`,
        })
        return
      }

      if (traits.length > 10) {
        setUploadArtworkError({
          maxTraits: `Maximum of 10 traits per collection. Your upload includes ${traits.length} traits.`,
        })
        return
      }

      if (filesArray[index - 1 > 0 ? index - 1 : 0].type !== cv.type) {
        setUploadArtworkError({
          mime: `All file types must be the same.`,
        })
        return
      }

      /* get image size */
      const fr = new FileReader()
      fr.readAsDataURL(cv)
      const getImageSize = (fr: FileReader, count: number) => {
        let img = new Image()
        img.src = fr.result?.toString() || ''
        img.onload = function () {
          let height = img.height
          let width = img.width
          let min = 600

          if ((height < min || width < min) && cv.type !== 'image/svg+xml') {
            setUploadArtworkError({
              dimensions: `we recommend images of min, 600px width x height, your images are width: ${width} x ${height} px`,
            })
            return
          }

          if (height !== width) {
            setUploadArtworkError({
              dimensions: `images must be of equal height and width, your images are width: ${width} x ${height} px`,
            })
            return
          }

          if (count === filesArray?.length - 1) {
            setIsProcessing(false)
          }
        }
      }
      fr.onload = () => getImageSize(fr, filesArray.indexOf(cv))

      acc.push({
        collection,
        trait: currentTrait,
        traitProperty: currentProperty,
        file: cv,
      })

      return acc
    }, [])

    return {
      filesLength: files.length,
      fileType,
      collectionName,
      traits,
      fileArray: reduced,
    }
  }, [files])

  React.useEffect(() => {
    if (isProcessing === false) {
      const filesArray = fileInfo?.fileArray.reduce((acc: any[], cv: { file: File }) => {
        acc.push(cv.file)

        return acc
      }, [])

      setFilesArray(filesArray)
    }
  }, [isProcessing, fileInfo])

  /*

   upload Files to ipfs via zora ipfs service
  
  */
  const uploadToIPFS: (files: File[]) => Promise<IPFSUpload[]> = async (files) => {
    const ipfsUploadResponse = await uploadDirectory(
      files.map((file) => ({
        content: file,
        path: file.webkitRelativePath.split('/').slice(1).join('/'),
      })),
      { cache: false }
    )

    return files.map((file) => ({
      name: sanitizeFileName(file.webkitRelativePath.split('/')[2]),
      property: file.webkitRelativePath.split('/')[2],
      collection: file.webkitRelativePath.split('/')[0],
      trait: sanitizeFileName(file.webkitRelativePath.split('/')[1]),
      path: file.webkitRelativePath,
      content: file,
      blob: URL.createObjectURL(file),
      webkitRelativePath: file.webkitRelativePath,
      type: file.type,
      ipfs: ipfsUploadResponse,
    }))
  }

  useEffect(() => {
    if (!filesArray || !!uploadArtworkError) return

    const handleUpload = async (filesArray: File[]) => {
      const files = filesArray.filter((file) => file.name !== '.DS_Store')
      try {
        setIsUploadingToIPFS(true)
        const ipfs = await uploadToIPFS(files)
        setIpfsUpload(ipfs)
        setIsUploadingToIPFS(false)
      } catch (err) {
        setIsUploadingToIPFS(false)
        Sentry.captureException(err)
        await Sentry.flush(2000)
        return
      }
    }

    handleUpload(filesArray)
  }, [filesArray, uploadArtworkError])

  /*

    add artwork traits and properties to store

  */
  React.useMemo(() => {
    if (!fileInfo || !filesArray || !fileInfo.traits || !formik || uploadArtworkError)
      return

    setSetUpArtwork({
      ...formik.values,
      artwork: fileInfo.traits,
      filesLength: fileInfo.filesLength,
    })
  }, [filesArray || fileInfo, uploadArtworkError])

  const previewVariants = {
    closed: {
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      x: '-105%',
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

  const { orderedLayers } = useFormStore()
  const canvas = React.useRef(null)
  const [generatedImages, setGeneratedImages] = React.useState<any[]>([])

  /*

    init
    - organize images by trait
    - compose layers
    - set initial selected traits (random selection)

   */

  const imagesByTrait = React.useMemo(() => {
    if (!images) return
    return images.reduce((acc: ImagesByTraitProps[] = [], image) => {
      const trait = image.trait
      const index = acc.findIndex((e: any) => e?.trait === trait)
      // const propertyTrait = orderedLayers.filter((item) => item.trait === image.trait)[0]
      const propertyTrait = orderedLayers.filter(
        (item) => item?.trait?.replace(/\s/g, '') === image?.trait?.replace(/\s/g, '')
      )?.[0]
      const orderedIndex = orderedLayers.indexOf(propertyTrait)

      if (index === -1) {
        acc[orderedIndex] = { trait, images: [image] }
      } else {
        acc[index]?.images.push(image)
      }
      return acc
    }, [])
  }, [images, orderedLayers])

  const layers = React.useMemo(() => {
    if (!imagesByTrait) return

    return imagesByTrait.map((layer: any) => {
      const trait = layer.trait?.replace(/^\d+-/, '')
      return { trait, images: layer.images }
    })
  }, [imagesByTrait])

  const [selectedTraits, setSelectedTraits] = React.useState<SelectedTraitsProps[]>([])
  React.useEffect(() => {
    if (selectedTraits.length || !layers) {
      return
    }

    setSelectedTraits(
      layers.map((layer: any) => {
        const random = Math.floor(Math.random() * layer.images.length)

        return {
          picker: 'random',
          trait: layer.trait,
          uri: layer.images[random].uri,
          content: layer.images[random].content,
        }
      })
    )
  }, [layers])

  /*

    create array of trait layer blobs

  */
  const [hasLocalFile, setHasLocalFile] = React.useState<boolean | undefined>(undefined)
  const imageLayerStack = React.useMemo(() => {
    if (!layers || !layers.length || !selectedTraits.length) return

    const arr: string[] = []
    selectedTraits.forEach((trait: any, index) => {
      const hasLocalFile =
        layers[index].images[Math.floor(Math.random() * layers[index].images.length)]
          .content.webkitRelativePath?.length > 0
      setHasLocalFile(hasLocalFile)
      let imageUrl

      if (trait.picker === 'random') {
        if (hasLocalFile) {
          imageUrl = URL.createObjectURL(
            layers[index]?.images[Math.floor(Math.random() * layers[index].images.length)]
              .content
          )
        } else {
          imageUrl =
            layers[index]?.images[Math.floor(Math.random() * layers[index].images.length)]
              .uri
        }

        arr.push(imageUrl)
      } else {
        const blob = URL?.createObjectURL(trait.content)
        arr.push(blob)
      }
    })

    return arr.reverse()
  }, [selectedTraits, layers, generatedImages])

  /*

    create array of Image objects from blob for canvas

  */
  const imagesToDraw = React.useMemo(() => {
    if (!imageLayerStack) return

    return imageLayerStack.reduce((acc: HTMLImageElement[] = [], cv: string) => {
      let image = new Image()

      image.src = cv
      acc.push(image)
      return acc
    }, [])
  }, [imageLayerStack])

  /*

    draw stacked image on canvas

  */
  const [isInit, setIsInit] = React.useState<boolean>(true)
  const generateStackedImage = React.useCallback(
    async (e?: BaseSyntheticEvent) => {
      try {
        if (e) e.stopPropagation()
        if (!imagesToDraw || !canvas.current) return

        if (hasLocalFile) {
          const _canvas: HTMLCanvasElement = canvas.current
          const ctx = _canvas?.getContext('2d')
          const generate = () => {
            _canvas.height = imagesToDraw[0].naturalHeight
            _canvas.width = imagesToDraw[0].naturalWidth

            for (let i = 0; i < imagesToDraw.length; i++) {
              ctx?.drawImage(imagesToDraw[i], 0, 0)
            }

            canvasToBlob(_canvas, imageLayerStack)
          }

          if (isInit) {
            imagesToDraw[0].onload = function () {
              generate()
              setIsInit(false)
            }
          } else {
            generate()
          }
        } else {
          if (!imageLayerStack) return

          const url = new URL('https://api.zora.co/renderer/stack-images')
          for (const image of imageLayerStack) {
            url.searchParams.append('images', encodeURI(image))
          }

          const response = await fetch(url.href, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          })
          const data = await response.json()
          setGeneratedImages([data])
        }
      } catch (err) {
        console.log('err', err)
      }
    },
    [imageLayerStack, imagesToDraw, canvas, isInit, hasLocalFile]
  )

  /*

    save blob of stacked image to store
    memory cleanup for saved image

 */
  const canvasToBlob = React.useCallback(
    (canvas: HTMLCanvasElement, stack: string[] | undefined = []) => {
      if (canvas.height > 0) {
        const data = canvas.toDataURL()

        setGeneratedImages([data, ...generatedImages])
        for (const blob of stack) {
          URL.revokeObjectURL(blob)
        }
      }
    },
    [generatedImages]
  )

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

  return (
    <Box mb={'x3'}>
      <label className={defaultInputLabelStyle}>{inputLabel}</label>
      {!!helperText && helperText?.length ? (
        <Stack mb={'x8'}>
          <Box className={defaultHelperTextStyle}>{helperText} </Box>
          <Flex align={'center'}>
            <a href={'/nouns.zip'} download className={defaultFileDownloadStyle}>
              <Icon id="download" mr={'x2'} />
              Download demo folder
            </a>
          </Flex>
        </Stack>
      ) : null}
      <div className={errorMessage ? dropAreaErrorStyle : dropAreaStyle}>
        <Box
          as={'label'}
          h={'x16'}
          w={'100%'}
          px={'x8'}
          htmlFor="file-upload"
          className={defaultUploadButtonStyle}
        >
          <Box as="span">Upload</Box>
          {(setUpArtwork.filesLength && (
            <Box as="span">{setUpArtwork.filesLength} Files</Box>
          )) || (
            <Box as="span" className={noneSelectedStyle}>
              None Selected
            </Box>
          )}
        </Box>
        <input
          className={defaultUploadStyle}
          id="file-upload"
          name="file"
          type="file"
          multiple={true}
          ref={dropInput}
          onChange={(event) => {
            setUploadArtworkError(undefined)
            setFiles(event.currentTarget.files)
            setOrderedLayers([])
          }}
        />
      </div>
      {(uploadArtworkError && (
        <Box p={'x4'} fontSize={12} className={uploadErrorBox}>
          <Box as={'ul'} m={'x0'}>
            {uploadArtworkError.maxTraits && <li>{uploadArtworkError.maxTraits}</li>}
            {uploadArtworkError.mime && <li>{uploadArtworkError.mime}</li>}
            {uploadArtworkError.directory && <li>{uploadArtworkError.directory}</li>}
            {uploadArtworkError.dimensions && <li>{uploadArtworkError.dimensions}</li>}
          </Box>
        </Box>
      )) ||
        (setUpArtwork.artwork.length > 0 && (
          <>
            <Box p={'x4'} fontSize={12} className={uploadSuccessBox}>
              <Box as={'ul'} m={'x0'}>
                <li>
                  {setUpArtwork.artwork.length > 1
                    ? `${setUpArtwork.artwork.length} traits`
                    : `${setUpArtwork.artwork.length} trait`}{' '}
                  &#9733;
                </li>
                <li>supported file type: {fileInfo?.fileType} &#9733;</li>
                <li>correct folder structure &#9733;</li>
              </Box>
            </Box>
            {images && <LayerOrdering images={images} />}

            <motion.div
              key={'preview-panel'}
              variants={previewVariants}
              initial={'closed'}
              animate={'open'}
              className={artworkPreviewPanel}
            >
              <Flex align={'center'} justify={'center'} direction={'column'}>
                <Flex className={artworkPreviewImageWrapper} mb={'x8'}>
                  <img height={'100%'} width={'100%'} src={generatedImages[0]} />
                  <canvas ref={canvas} style={{ display: 'none' }} />
                </Flex>
                <Flex
                  mb={'x6'}
                  align={'center'}
                  onClick={() => generateStackedImage()}
                  className={artworkPreviewGenerateButton}
                >
                  <Flex w={'x6'} h={'x6'} mr={'x2'}>
                    <Icon id="refresh" />
                  </Flex>
                  <Flex>Generate Randomized Preview</Flex>
                </Flex>
                <Flex></Flex>
                {images && (
                  <AnimatedModal
                    size={'large'}
                    trigger={<Flex>See more in Advanced Preview Playground</Flex>}
                  >
                    <Playground images={images} />
                  </AnimatedModal>
                )}
              </Flex>
            </motion.div>
          </>
        ))}
    </Box>
  )
}
