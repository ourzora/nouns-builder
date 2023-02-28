import { Box, Flex, Text } from '@zoralabs/zord'

import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { statistic, statisticContent } from 'src/styles/About.css'

interface StatisticProps {
  title: string
  content?: string | number
  address?: string
}

export const Statistic: React.FC<StatisticProps> = ({ title, content, address }) => {
  return (
    <Box className={statistic}>
      <Flex direction={'row'} w={'100%'} justify={'space-between'}>
        <Text color="tertiary">{title}</Text>
        {title === 'Treasury' && (
          <a
            href={`${ETHERSCAN_BASE_URL}/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon id="arrowTopRight" fill={'text4'} />
          </a>
        )}
      </Flex>
      <Text
        mt={{ '@initial': 'x1', '@768': 'x3' }}
        fontWeight={'display'}
        className={statisticContent}
      >
        {!!content ? content : undefined}
      </Text>
    </Box>
  )
}
