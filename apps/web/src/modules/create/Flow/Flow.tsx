import React from 'react'
import { flowWrapper } from 'src/styles/styles.css'
import { Flex } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import FlowSection from './FlowSection'
import { CREATE_SECTIONS, CreateSectionProps } from 'src/modules/create/constants'

const Flow: React.FC<{ section: CreateSectionProps }> = ({ section }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Flex direction={'column'} width={'100%'}>
      <motion.div
        className={flowWrapper}
        initial="initial"
        animate={isOpen ? 'animate' : 'initial'}
      >
        {Object.values(CREATE_SECTIONS)?.map((section) => (
          <FlowSection
            sections={CREATE_SECTIONS}
            section={section}
            setIsOpen={setIsOpen}
            key={section.title}
          />
        ))}
      </motion.div>
    </Flex>
  )
}

export default Flow
