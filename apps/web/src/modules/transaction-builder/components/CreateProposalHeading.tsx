import React from 'react'
import { Stack, Text } from '@zoralabs/zord'
import Navigation from '../../proposals/components/ProposalHeader/ProposalNavigation'
import { useRouter } from 'next/router'

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
      <Navigation />
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
