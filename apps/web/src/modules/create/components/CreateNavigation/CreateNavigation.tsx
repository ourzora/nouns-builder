import React from 'react'
import { flowWrapper } from 'src/styles/styles.css'
import { Box, Flex } from '@zoralabs/zord'
import { NavSection } from './NavSection'
import { CreateFormSection } from 'src/modules/create';

export const CreateNavigation: React.FC<{
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
