import React, { ReactNode } from 'react'
import { Box, Flex, Heading } from '@zoralabs/zord'
import {
  createWrapperHalf,
  formWrapper,
  headingStyle,
  pageGrid,
  preHeadingStyle,
  subHeadingStyle,
} from '../../../styles/styles.css'
import Flow from '../Flow/Flow'
import { AnimatePresence, motion } from 'framer-motion'
import { CreateSectionProps } from '../constants'

export const CreateLayout = ({
  section,
  children,
}: {
  section: CreateSectionProps
  children: ReactNode
}) => {
  return (
    <Box position="relative" className={pageGrid}>
      <Flex className={createWrapperHalf['left']}>
        <Flex
          position={'absolute'}
          left={'x0'}
          top={'x0'}
          width={'100%'}
          height={'100%'}
          style={{
            background:
              'linear-gradient(179.98deg, rgba(0, 0, 0, 0.5) -0.98%, rgba(0, 0, 0, 0) 47.4%, rgba(0, 0, 0, 0.6) 99.98%)',
          }}
        />
        <Flow section={section} />
      </Flex>
      <Flex
        className={createWrapperHalf['right']}
        p={'x20'}
        placeItems={'center'}
        justify={'center'}
      >
        <Flex direction={'column'} className={formWrapper}>
          <AnimatePresence exitBeforeEnter={true}>
            <motion.div
              // key={sections[activeSection]?.title}
              variants={{
                exit: {
                  y: 10,
                  opacity: 0,
                },
                closed: {
                  y: 10,
                  opacity: 0,
                },
                open: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    when: 'afterChildren',
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <Flex className={preHeadingStyle}>Create A dao</Flex>
              <Heading as={'h3'} mt={'x0'} mb={'x8'} className={headingStyle}>
                {section.title}
                {/*{!heading*/}
                {/*  ? title*/}
                {/*  : Array.isArray(heading)*/}
                {/*    ? heading[activeSectionCurrentIndex]*/}
                {/*    : heading}*/}
              </Heading>
              {/*{subHeading && (*/}
              <Box mb={'x7'} className={subHeadingStyle}>
                {section.subHeading}
                {/*{Array.isArray(subHeading) ? subHeading[activeSectionCurrentIndex] : subHeading}*/}
              </Box>
              {/*)}*/}
              {children}
              {/*<FormHandler*/}
              {/*  forms={sections[activeSection]?.forms}*/}
              {/*  title={sections[activeSection]?.title}*/}
              {/*  heading={sections[activeSection]?.heading}*/}
              {/*  subHeading={sections[activeSection]?.subHeading}*/}
              {/*  sections={sections}*/}
              {/*/>*/}
            </motion.div>
          </AnimatePresence>
        </Flex>
      </Flex>
    </Box>
  )
}
