import React from 'react'
import { flowWrapper } from 'src/styles/styles.css'
import { Box, Flex } from '@zoralabs/zord'
import { CreateFormSection } from 'src/typings'
import { NavSection } from './NavSection'

export const NavWrapper: React.FC<{
  sections: any[]
}> = ({ sections }) => (
  <Flex direction={'column'} width={'100%'}>
    <Box className={flowWrapper}>
      {!!sections &&
        sections.length > 0 &&
        sections?.map((section: CreateFormSection) => (
          <NavSection sections={sections} section={section} key={section.title} />
        ))}
    </Box>
  </Flex>
)
