import React, { BaseSyntheticEvent } from 'react'

import { OrderedTraits } from 'src/components/Artwork/LayerBox'
import { RENDERER_BASE } from 'src/constants/rendererBase'

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
  const canvas = React.useRef<HTMLCanvasElement | null>(null)
  const [generatedImages, setGeneratedImages] = React.useState<string[]>([])
  const [hasLocalFile, setHasLocalFile] = React.useState<boolean>(false)
  const [isInit, setIsInit] = React.useState<boolean>(true)

  // Group images by trait
  const imagesByTrait = React.useMemo(() => {
    if (!images) return []

    return images.reduce((acc: ImagesByTraitProps[], image) => {
      const trait = image.trait
      const propertyTrait = orderedLayers.find(
        (item) => item?.trait?.replace(/\s/g, '') === image?.trait?.replace(/\s/g, '')
      )
      const orderedIndex = orderedLayers.indexOf(propertyTrait!)
      const existingIndex = acc.findIndex((e) => e.trait === trait)

      if (existingIndex === -1) {
        acc[orderedIndex] = { trait, images: [image] }
      } else {
        acc[existingIndex].images.push(image)
      }

      return acc
    }, [])
  }, [images, orderedLayers])

  // Build layer structure
  const layers = React.useMemo(() => {
    return imagesByTrait.map((layer) => ({
      trait: layer.trait.replace(/^\d+-/, ''),
      images: layer.images,
    }))
  }, [imagesByTrait])

  // Select one random image per trait
  const selectedTraits: SelectedTraitsProps[] = React.useMemo(() => {
    return layers.map((layer) => {
      const randomIndex = Math.floor(Math.random() * layer.images.length)
      const selectedImage = layer.images[randomIndex]
      return {
        picker: 'random',
        trait: layer.trait,
        uri: selectedImage.uri,
        content: selectedImage.content as File,
      }
    })
  }, [layers])

  // Generate local/remote URLs for stacking
  const imageLayerStack = React.useMemo(() => {
    if (!selectedTraits.length) return []

    const stack = selectedTraits.map((trait) => {
      const isLocal = trait.content?.webkitRelativePath?.length > 0
      return isLocal ? URL.createObjectURL(trait.content) : trait.uri
    })

    return stack.reverse()
  }, [selectedTraits])

  // Determine if any trait is using a local file
  React.useEffect(() => {
    const usingLocal = selectedTraits.some(
      (trait) => trait.content?.webkitRelativePath?.length > 0
    )
    setHasLocalFile(usingLocal)
  }, [selectedTraits])

  // Cleanup blob URLs
  React.useEffect(() => {
    return () => {
      imageLayerStack.forEach((blob) => {
        if (blob.startsWith('blob:')) URL.revokeObjectURL(blob)
      })
    }
  }, [imageLayerStack])

  // Convert image URLs into Image objects for canvas rendering
  const imagesToDraw = React.useMemo(() => {
    return imageLayerStack.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })
  }, [imageLayerStack])

  // Draw stacked image on canvas
  const canvasToBlob = React.useCallback(
    (canvas: HTMLCanvasElement, stack: string[]) => {
      if (canvas.height > 0) {
        const data = canvas.toDataURL()
        setGeneratedImages([data, ...generatedImages])

        stack.forEach((blob) => {
          if (blob.startsWith('blob:')) URL.revokeObjectURL(blob)
        })
      }
    },
    [generatedImages]
  )

  const generateStackedImage = React.useCallback(
    async (e?: BaseSyntheticEvent) => {
      try {
        if (e) e.stopPropagation()
        if (!canvas.current || !imagesToDraw.length) return

        const _canvas = canvas.current
        const ctx = _canvas.getContext('2d')

        const draw = () => {
          _canvas.width = imagesToDraw[0].naturalWidth
          _canvas.height = imagesToDraw[0].naturalHeight

          imagesToDraw.forEach((img) => {
            ctx?.drawImage(img, 0, 0)
          })

          canvasToBlob(_canvas, imageLayerStack)
        }

        if (hasLocalFile) {
          if (isInit) {
            imagesToDraw[0].onload = () => {
              draw()
              setIsInit(false)
            }
          } else {
            draw()
          }
        } else {
          const url = new URL(RENDERER_BASE)
          for (const image of imageLayerStack) {
            url.searchParams.append('images', encodeURI(image))
          }

          const response = await fetch(url.href)
          const data = await response.json()
          setGeneratedImages([data])
        }
      } catch (err) {
        console.error('Error generating image', err)
      }
    },
    [canvas, imagesToDraw, hasLocalFile, isInit, canvasToBlob, imageLayerStack]
  )

  return {
    generateStackedImage,
    imagesToDraw,
    generatedImages,
    canvas,
  }
}
