import React, { memo } from 'react'
import { flowWrapper } from 'src/styles/styles.css'
import { Flex } from '@zoralabs/zord'
import { CreateFormSection } from 'src/typings'
import { motion } from 'framer-motion'
import FlowSection from './FlowSection'

const Flow: React.FC<{
  sections: any[]
}> = memo(({ sections }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Flex direction={'column'} width={'100%'}>
      <motion.div
        className={flowWrapper}
        // variants={isMobile ? variants : undefined} -- mobile menu
        initial="initial"
        animate={isOpen ? 'animate' : 'initial'}
      >
        {!!sections &&
          sections.length > 0 &&
          sections?.map((section: CreateFormSection) => (
            <FlowSection
              sections={sections}
              section={section}
              setIsOpen={setIsOpen}
              key={section.title}
            />
          ))}
      </motion.div>
    </Flex>
  )
})

export default Flow
