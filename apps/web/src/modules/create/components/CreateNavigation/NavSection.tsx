import { Box, Flex } from '@zoralabs/zord'
import React from 'react'
import { useFormStore } from 'src/stores/useFormStore'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import {
  circleVariant,
  flowSectionWrapperVariants,
  flowTitleVariant,
} from 'src/styles/styles.css'
import { CreateFormSection } from "src/modules/create"

export const NavSection: React.FC<{
  sections: CreateFormSection[]
  section: CreateFormSection
}> = ({ sections, section }) => {
  const { fulfilledSections, activeSection, setActiveSection, setUpArtwork } =
    useFormStore()
  const { isMobile } = useLayoutStore()
  const [titleType, setTitleType] = React.useState<
    'default' | 'active' | 'fulfilled' | 'preview' | 'previewActive'
  >('default')
  const [circleType, setCircleType] = React.useState<
    | 'flowCircle'
    | 'flowCircleLast'
    | 'flowCircleActive'
    | 'flowCircleActiveLast'
    | 'flowFulfilledCircle'
    | 'flowFulfilledCircleLast'
    | 'preview'
    | 'previewActive'
  >('flowCircle')

  React.useEffect(() => {
    setCircleType(
      activeSection === 4 &&
        sections[activeSection]?.title === section?.title &&
        !!setUpArtwork.artwork.length
        ? 'previewActive'
        : activeSection === 4 && !!setUpArtwork.artwork.length
        ? 'preview'
        : sections[activeSection]?.title === section?.title
        ? sections.indexOf(section) + 1 === sections.length
          ? 'flowCircleActiveLast'
          : 'flowCircleActive'
        : fulfilledSections.includes(section?.title)
        ? sections.indexOf(section) + 1 === sections.length
          ? 'flowFulfilledCircleLast'
          : 'flowFulfilledCircle'
        : sections.indexOf(section) + 1 === sections.length
        ? 'flowCircleLast'
        : 'flowCircle'
    )

    setTitleType(
      activeSection === 4 &&
        sections[activeSection]?.title === section?.title &&
        !!setUpArtwork.artwork.length
        ? 'previewActive'
        : activeSection === 4 && !!setUpArtwork.artwork.length
        ? 'preview'
        : fulfilledSections.includes(section?.title)
        ? 'fulfilled'
        : sections[activeSection]?.title === section?.title
        ? 'active'
        : 'default'
    )
  }, [section, sections, fulfilledSections, activeSection, setUpArtwork])

  return (
    <Flex
      direction={'row'}
      key={section?.title}
      className={
        flowSectionWrapperVariants[
          activeSection === 4 && !!setUpArtwork.artwork.length ? 'preview' : 'default'
        ]
      }
      onClick={
        !!(sections && fulfilledSections.includes(section?.title))
          ? () => {
              setActiveSection(sections.indexOf(section))
            }
          : () => {}
      }
    >
      <Flex direction={'column'} align={'center'}>
        <Flex
          align={'center'}
          justify={'center'}
          className={circleVariant[circleType]}
          height={'x4'}
          width={'x4'}
        >
          {fulfilledSections.includes(section?.title)}
        </Flex>
        <Box className={flowTitleVariant[titleType]}>{section?.title}</Box>
      </Flex>
    </Flex>
  )
}
