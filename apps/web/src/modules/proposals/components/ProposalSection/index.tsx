import { Flex, Text } from '@zoralabs/zord'
import { ReactNode } from 'react'

interface ProposalSectionProps {
  title?: string
  children: ReactNode
}

const ProposalSection: React.FC<ProposalSectionProps> = ({ title, children }) => (
  <Flex direction={'column'} mt={'x6'}>
    {!!title && (
      <Text color="text3" mb={'x4'}>
        {title}
      </Text>
    )}
    {children}
  </Flex>
)

export default ProposalSection
