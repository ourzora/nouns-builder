import { LayerBox } from './LayerBox'
import { Box } from '@zoralabs/zord'
import React from 'react'
import { defaultFormHeading } from 'src/components/Fields/styles.css'
import { useFormStore } from 'src/stores/useFormStore'
import { DragAndDropProps, ImageProps } from 'src/typings'

interface LayerOrderingProps {
  title?: string
  images: ImageProps[]
}

export const LayerOrdering: React.FC<LayerOrderingProps> = ({ title, images }) => {
  const { setUpArtwork, orderedLayers, setOrderedLayers } = useFormStore()
  const { artwork } = setUpArtwork

  /*  init layers and drag and drop  */
  const [dragAndDrop, setDragAndDrop] = React.useState<DragAndDropProps | null>(null)
  React.useEffect(() => {
    if (!orderedLayers.length) {
      setOrderedLayers(artwork)
    }
  }, [artwork, orderedLayers, setOrderedLayers])

  return (
    <Box>
      <h3 className={defaultFormHeading}>{title}</h3>
      {orderedLayers && (
        <Box>
          {orderedLayers.map(({ trait, properties }, index) => (
            <LayerBox
              key={trait}
              trait={trait}
              properties={properties}
              ipfs={images}
              setDragAndDrop={setDragAndDrop}
              dragAndDrop={dragAndDrop}
              orderedLayers={orderedLayers}
              index={index}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
