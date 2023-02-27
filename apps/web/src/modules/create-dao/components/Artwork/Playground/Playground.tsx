import { Button, Flex } from '@zoralabs/zord'
import React, { BaseSyntheticEvent } from 'react'
import { ImagesByTraitProps, PlaygroundProps, SelectedTraitsProps } from 'src/typings'

import { useFormStore } from 'src/stores/useFormStore'

import {
  previewGridWrapperStyle,
  previewHeadingStyle,
  previewLayerSelectorWrapperStyle,
  previewModalWrapperStyle,
  previewWrapperInnerStyle,
} from 'src/styles/Artwork.css'

import { ImageGrid } from './ImageGrid'
import { LayerMenu } from './LayerMenu'

export const Playground: React.FC<PlaygroundProps> = ({ images }) => {
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
      const propertyTrait = orderedLayers.filter((item) => item.trait === image.trait)[0]
      const orderedIndex = orderedLayers.indexOf(propertyTrait)

      if (index === -1) {
        acc[orderedIndex] = { trait, images: [image] }
      } else {
        acc[index].images.push(image)
      }
      return acc
    }, [])
  }, [images])

  const layers = React.useMemo(() => {
    if (!imagesByTrait) return

    return imagesByTrait.map((layer: any) => ({
      trait: layer.trait?.replace(/^\d+-/, ''),
      images: layer.images,
    }))
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
  }, [layers, selectedTraits])

  /*

    create array of trait layer blobs

  */
  const imageLayerStack = React.useMemo(() => {
    if (!layers || !selectedTraits.length) return

    const arr: string[] = []
    selectedTraits.forEach((trait: any, index) => {
      const hasLocalFile =
        layers[index].images[Math.floor(Math.random() * layers[index].images.length)]
          .content.webkitRelativePath?.length > 0
      let imageUrl

      if (trait.picker === 'random') {
        if (hasLocalFile) {
          imageUrl = URL.createObjectURL(
            layers[index].images[Math.floor(Math.random() * layers[index].images.length)]
              .content
          )
        } else {
          imageUrl =
            layers[index].images[Math.floor(Math.random() * layers[index].images.length)]
              .url
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
  const generateStackedImage = (e?: BaseSyntheticEvent) => {
    try {
      if (e) e.stopPropagation()
      if (!imagesToDraw || !canvas.current) return

      const _canvas: HTMLCanvasElement = canvas.current
      const ctx = _canvas?.getContext('2d')
      _canvas.height = imagesToDraw[0].height
      _canvas.width = imagesToDraw[0].width

      for (let i = 0; i < imagesToDraw.length; i++) {
        ctx?.drawImage(imagesToDraw[i], 0, 0)
      }

      canvasToBlob(_canvas, imageLayerStack)
    } catch (err) {
      console.log('err', err)
    }
  }

  /*

    save blob of stacked image to store
    memory cleanup for saved image

 */
  const canvasToBlob = (canvas: HTMLCanvasElement, stack: string[] | undefined = []) => {
    if (canvas.height > 0) {
      const data = canvas.toDataURL()
      setGeneratedImages([data, ...generatedImages])
      for (const blob of stack) {
        URL.revokeObjectURL(blob)
      }
    }
  }

  return (
    <Flex direction={'column'} className={previewModalWrapperStyle}>
      <h3 className={previewHeadingStyle}>Preview Artwork</h3>
      <Flex direction={'row'} gap={'x6'} className={previewWrapperInnerStyle}>
        <Flex
          className={previewLayerSelectorWrapperStyle}
          direction={'column'}
          justify="flex-start"
        >
          {layers && (
            <LayerMenu
              layers={layers}
              selectedTraits={selectedTraits}
              setSelectedTraits={setSelectedTraits}
            />
          )}
          <Button
            width="100%"
            style={{ alignSelf: 'center', borderRadius: '16px' }}
            onClick={(e: BaseSyntheticEvent) => generateStackedImage(e)}
            disabled={!imageLayerStack}
          >
            Generate
          </Button>
        </Flex>
        <Flex className={previewGridWrapperStyle}>
          <canvas ref={canvas} style={{ display: 'none' }} />
          {generatedImages.length ? (
            <ImageGrid generatedImages={generatedImages} />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
