import React, { ReactElement, ReactNode } from 'react'
import { Flex } from '@zoralabs/zord'
import {
  infoSectionWrapper,
  reviewSectionStyleVariants,
  reviewSectionSubHeading,
} from 'src/styles/deploy.css'
import { Icon } from 'src/components/Icon'
import { motion } from 'framer-motion'

const ReviewSection: React.FC<{
  subHeading: string
  children: ReactNode[]
}> = ({ subHeading, children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const variants = {
    initial: {
      height: 0,
      paddingBottom: 0,
    },
    open: {
      height: 'auto',
      paddingBottom: 20,
    },
  }

  return (
    <Flex
      direction={'column'}
      align={'start'}
      width={'100%'}
      borderRadius={'curved'}
      mb={'x4'}
      borderWidth={'thin'}
      borderColor={'primary'}
      className={reviewSectionStyleVariants[isOpen ? 'open' : 'default']}
      onClick={() => setIsOpen((bool) => !bool)}
    >
      <Flex
        align={'center'}
        justify={'center'}
        className={reviewSectionSubHeading}
        px={'x6'}
        py={'x4'}
      >
        {subHeading}
        <Flex align={'center'} justify={'center'} ml={'auto'}>
          {(!isOpen && <Icon id="chevronDown" />) || <Icon id="chevronUp" />}
        </Flex>
      </Flex>

      <motion.div
        className={infoSectionWrapper}
        variants={variants}
        initial={'initial'}
        animate={!isOpen ? 'initial' : 'open'}
      >
        <Flex direction={'column'} width={'100%'} px={'x6'} py={'x4'}>
          {children}
        </Flex>
      </motion.div>
    </Flex>
  )
}

export default ReviewSection
