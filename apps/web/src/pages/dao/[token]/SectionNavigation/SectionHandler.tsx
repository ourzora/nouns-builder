import React, { ReactElement } from 'react'
import { Flex, Box, Text } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import {
  sectionHandler,
  sectionNavigation,
  sectionNavigationWrapper,
  sectionTabVariants,
} from 'src/styles/SectionNavigation.css'
import { useRouter } from 'next/router'
import { slugify } from 'src/utils/slugify'
import Link from 'next/link'
import { unslugify } from 'src/utils/unslugify'
import omit from 'lodash/omit'

interface SectionHandlerProps {
  sections: {
    title: string
    component: ReactElement[]
  }[]
}

interface activeSectionProps {
  title: string
  component: React.ReactElement[]
}

const SectionHandler: React.FC<SectionHandlerProps> = ({ sections }) => {
  const router = useRouter()
  const { query } = router

  /*

    handle active session if:
    - no tab query param is defined (pre auction start)
    - no tab query param defined (post auction start)
    - query tab is defined
    - unknown query tab is set

   */
  const tab = React.useCallback(
    (title: string) => {
      return sections?.find((section) => section.title === title)
    },
    [sections]
  )

  const activeSection: activeSectionProps | undefined = React.useMemo(() => {
    const isPreAuction = !query.tokenId
    const activity = tab('Activity')
    const about = tab('About')

    if (!query.tab) {
      return isPreAuction ? activity : about
    }

    return tab(unslugify(query.tab as string)) ?? activity
  }, [query, tab])

  return (
    <>
      {sections && sections.length > 1 && (
        <Box position={'relative'} className={sectionNavigationWrapper}>
          <Flex
            px={'x2'}
            mx={{ '@initial': 'x0', '@768': 'auto' }}
            justify={'center'}
            className={sectionNavigation}
            w={'100%'}
          >
            {sections?.map((section, index) => {
              return (
                <Link
                  href={{
                    pathname: router.pathname,
                    query: {
                      ...omit(query, ['page']),
                      tab: slugify(section.title),
                    },
                  }}
                  scroll={false}
                  shallow={true}
                  key={section.title}
                >
                  <Flex
                    direction="column"
                    key={index}
                    className={
                      sectionTabVariants[
                        activeSection?.title === section.title ? 'active' : 'default'
                      ]
                    }
                    w={'100%'}
                    align={'center'}
                  >
                    <Text fontWeight={'display'}>{section.title}</Text>
                  </Flex>
                </Link>
              )
            })}
          </Flex>
        </Box>
      )}
      <Flex direction="column" className={sectionHandler} mx={'auto'}>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            key={activeSection?.title}
            variants={{
              closed: {
                y: 10,
                opacity: 0,
              },
              open: {
                y: 0,
                opacity: 1,
              },
            }}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {!!activeSection && <>{React.cloneElement(activeSection.component[0])}</>}
          </motion.div>
        </AnimatePresence>
      </Flex>
    </>
  )
}

export default SectionHandler
