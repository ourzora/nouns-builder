import { Box, Flex } from '@zoralabs/zord'
import React from 'react'
import { useFormStore } from 'src/stores/useFormStore'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import {
  circleVariant,
  flowSectionWrapperVariants,
  flowTitleVariant,
} from 'src/styles/styles.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CreateSectionProps, CreateSectionsProps } from 'src/modules/create/constants'

const FlowSection: React.FC<{
  sections: CreateSectionsProps
  section: CreateSectionProps
  setIsOpen: (bool: boolean) => void
}> = ({ sections, section, setIsOpen }) => {
  const router = useRouter()
  const { pathname } = router
  const activeRoute = pathname.split('/')[2]
  console.log('ac', activeRoute, sections)

  // const activeForm = sections.filter(
  //   (section) => section.title.toLowerCase() === activeRoute
  // )[0]
  // const activeSection = sections.indexOf(activeForm)

  // console.log('router', activeSection)

  const activeSection = 4

  const { fulfilledSections, setActiveSection, setUpArtwork } = useFormStore()
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
    setCircleType('flowCircle')

    setTitleType('preview')
  }, [section, sections, fulfilledSections, activeSection, setUpArtwork])

  return (
    <Flex
      direction={'row'}
      key={section?.title}
      className={
        flowSectionWrapperVariants['preview']
      }
    >
      <Link
        href={{
          pathname: `/create/${section.title.toLowerCase()}`,
        }}
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
      </Link>
    </Flex>
  )
}

export default FlowSection
