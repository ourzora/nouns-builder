import React from 'react'
import { Stack, Text } from '@zoralabs/zord'
import { ProposalNavigation } from 'src/modules/proposals'

interface CreateProposalHeadingProps {
  title: string
  align?: 'center' | 'left'
}

const CreateProposalHeading: React.FC<CreateProposalHeadingProps> = ({
  title,
  align = 'left',
}) => {
  return (
    <Stack mx={'auto'} pb={'x8'} w={'100%'}>
      <ProposalNavigation />
      <Text
        fontSize={35}
        fontWeight={'label'}
        style={{ lineHeight: '44px' }}
        mt={'x8'}
        textAlign={align}
      >
        {title}
      </Text>
    </Stack>
  )
}

export default CreateProposalHeading
