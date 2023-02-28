import { Box, Flex, Stack, atoms } from '@zoralabs/zord'
import React, { BaseSyntheticEvent } from 'react'

import { Icon } from 'src/components/Icon'
import {
  layerSelectStyle,
  selectTraitNameStyle,
  selectTraitNameWrapper,
} from 'src/styles/Artwork.css'
import { ImageProps } from 'src/typings'

interface layerProps {
  trait: string
  images: ImageProps[]
}

interface selectedTraits {
  picker: string
  trait: string
  uri: string
  content: File
}

export const LayerMenu: React.FC<{
  layers: layerProps[]
  selectedTraits: selectedTraits[]
  setSelectedTraits: (selectedTraits: selectedTraits[]) => void
}> = ({ layers, selectedTraits, setSelectedTraits }) => {
  const handleChange = (
    e: BaseSyntheticEvent,
    images: { uri: string; trait: string; content: File }[],
    trait: string
  ) => {
    const uri =
      e.target.value === 'random'
        ? images[Math.floor(Math.random() * images.length)].uri
        : e.target.value

    const content =
      e.target.value === 'random'
        ? images[Math.floor(Math.random() * images.length)].content
        : images.filter((item) => item.uri === e.target.value)[0].content

    const index = selectedTraits.findIndex(
      (selected: selectedTraits) => selected.trait === trait
    )

    if (index === -1) {
      setSelectedTraits([...selectedTraits, { picker: trait, trait, uri, content }])
    } else {
      setSelectedTraits([
        ...selectedTraits.slice(0, index),
        { picker: trait, trait, uri, content },
        ...selectedTraits.slice(index + 1),
      ])
    }
  }

  return (
    <Stack className={selectTraitNameWrapper}>
      {layers &&
        layers?.map((layer: any) => {
          const trait = layer.trait
          const images = layer.images

          return (
            <Stack key={trait} position={'relative'}>
              <Box
                position="absolute"
                top={'x1'}
                left={'x4'}
                fontSize={12}
                className={selectTraitNameStyle}
              >
                {trait}
              </Box>
              <Flex
                className={[
                  atoms({
                    position: 'absolute',
                    top: 'x3',
                    right: 'x2',
                    pointerEvents: 'none',
                  }),
                ]}
              >
                <Icon id="chevronDown" />
              </Flex>

              <select
                className={layerSelectStyle}
                name={trait}
                defaultValue="Random"
                onChange={(e: BaseSyntheticEvent) => handleChange(e, images, trait)}
              >
                <option key="random-property" value="random">
                  Random
                </option>
                {images.map((image: any) => (
                  <option key={image.name} value={image.uri}>
                    {image.name}
                  </option>
                ))}
              </select>
            </Stack>
          )
        })}
    </Stack>
  )
}
