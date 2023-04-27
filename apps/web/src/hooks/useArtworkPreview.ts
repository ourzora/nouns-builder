import React, { BaseSyntheticEvent } from 'react'

import { OrderedTraits } from 'src/modules/create-dao/components/Artwork/LayerBox'

import { ImageProps } from './useArtworkUpload'

export interface UseArtworkPreviewProps {
  orderedLayers: OrderedTraits
  images?: ImageProps[]
}

export interface ImagesByTraitProps {
  trait: string
  images: ImageProps[]
}

export interface SelectedTraitsProps {
  picker: string
  trait: string
  uri: string
  content: File
}

export const useArtworkPreview = ({ images, orderedLayers }: UseArtworkPreviewProps) => {
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

  return { generateStackedImage, imagesToDraw, generatedImages, canvas }
}
