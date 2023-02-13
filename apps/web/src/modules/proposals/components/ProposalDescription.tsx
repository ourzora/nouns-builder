import { atoms, Box, Flex, Paragraph } from '@zoralabs/zord'
import React, { ReactNode } from 'react'
import DecodedTransactions from 'src/components/DecodedTransactions'
import Image from 'next/image'
import useSWR from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'
import { sdk } from 'src/graphql/client'
import { CHAIN } from 'src/constants/network'
import { SortDirection, TokenSortKey } from 'src/graphql/sdk'
import { useEnsData } from 'src/hooks/useEnsData'
import { Proposal } from 'src/typings'

const ReactHtmlParser = require('react-html-parser').default

const Section = ({ children, title }: { children: ReactNode; title: string }) => (
  <Box mb={{ '@initial': 'x6', '@768': 'x13' }}>
    <Box fontSize={20} mb={{ '@initial': 'x4', '@768': 'x5' }} fontWeight={'display'}>
      {title}
    </Box>
    {children}
  </Box>
)

type ProposalDescriptionProps = {
  proposal: Proposal
  collection: string
}

const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  proposal,
  collection,
}) => {
  const { description, proposer, calldatas, values, targets } = proposal
  const { displayName } = useEnsData(proposer)

  const { data: tokenImage, error } = useSWR(
    !!collection && !!proposer ? [SWR_KEYS.TOKEN_IMAGE, collection, proposer] : null,
    async (_, collection, proposer) => {
      const data = await sdk.tokens({
        chain: CHAIN,
        pagination: { limit: 1 },
        where: { ownerAddresses: [proposer], collectionAddresses: [collection] },
        sort: { sortKey: TokenSortKey.Minted, sortDirection: SortDirection.Asc },
      })
      return data?.tokens?.nodes[0]?.token?.image?.url
    },
    { revalidateOnFocus: false }
  )

  return (
    <Flex direction={'column'} mt={{ '@initial': 'x6', '@768': 'x13' }}>
      <Section title="Description">
        <Paragraph overflow={'auto'}>{ReactHtmlParser(description)}</Paragraph>
      </Section>

      <Section title="Proposer">
        <Flex direction={'row'} placeItems={'center'}>
          <Box
            backgroundColor="background2"
            width={'x8'}
            height={'x8'}
            mr={'x2'}
            borderRadius={'small'}
            position="relative"
          >
            {!!tokenImage && !error && (
              <Image
                alt="proposer"
                src={tokenImage}
                quality={50}
                width={128}
                height={128}
                className={atoms({ borderRadius: 'small' })}
              />
            )}
          </Box>

          <Box>{displayName}</Box>
        </Flex>
      </Section>

      <Section title="Proposed Transactions">
        <DecodedTransactions targets={targets} calldatas={calldatas} values={values} />
      </Section>
    </Flex>
  )
}

export default ProposalDescription
