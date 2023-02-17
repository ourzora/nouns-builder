import { Box, Flex } from '@zoralabs/zord'
import React from 'react'
import { useFormStore } from 'src/stores/useFormStore'
import {
  circleVariant,
  flowSectionWrapperVariants,
  flowTitleVariant,
} from 'src/styles/styles.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CREATE_FORM_ORDER, SectionProps } from 'src/modules/create/constants'

const FlowSection: React.FC<{
  section: SectionProps
}> = ({ section }) => {
  const router = useRouter()
  const activeRoute = router.pathname.split('/')[2] as SectionProps
  const sectionPosition = CREATE_FORM_ORDER.indexOf(section)
  const activeSectionPosition = CREATE_FORM_ORDER.indexOf(activeRoute)
  const isActive = sectionPosition === activeSectionPosition
  const isFulfilled = sectionPosition <= activeSectionPosition
  const isLast = sectionPosition === CREATE_FORM_ORDER.length

  const { setUpArtwork } = useFormStore()
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
      activeSectionPosition === 4 && isActive && !!setUpArtwork.artwork.length
        ? 'previewActive'
        : activeSectionPosition === 4 && !!setUpArtwork.artwork.length
        ? 'preview'
        : isActive
        ? isLast
          ? 'flowCircleActiveLast'
          : 'flowCircleActive'
        : isFulfilled
        ? isLast
          ? 'flowFulfilledCircleLast'
          : 'flowFulfilledCircle'
        : isLast
        ? 'flowCircleLast'
        : 'flowCircle'
    )

    setTitleType(
      activeSectionPosition === 4 && isActive && !!setUpArtwork.artwork.length
        ? 'previewActive'
        : activeSectionPosition === 4 && !!setUpArtwork.artwork.length
        ? 'preview'
        : isFulfilled
        ? 'fulfilled'
        : isActive
        ? 'active'
        : 'default'
    )
  }, [section, activeSectionPosition, setUpArtwork])

  return (
    <Flex
      direction={'row'}
      key={section}
      className={flowSectionWrapperVariants['preview']}
    >
      <Link
        href={{
          pathname: isFulfilled ? `/create/${section}` : null,
        }}
      >
        <Flex direction={'column'} align={'center'}>
          <Flex
            align={'center'}
            justify={'center'}
            className={circleVariant[circleType]}
            height={'x4'}
            width={'x4'}
          />
          <Box className={flowTitleVariant[titleType]}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Box>
        </Flex>
      </Link>
    </Flex>
  )
}

export default FlowSection
