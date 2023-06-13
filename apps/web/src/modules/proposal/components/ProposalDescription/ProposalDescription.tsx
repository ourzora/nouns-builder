import { Box, Flex, Paragraph, atoms } from '@zoralabs/zord'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { Proposal } from 'src/data/graphql/requests/proposalQuery'
import { sdk } from 'src/data/subgraph/client'
import { OrderDirection, Token_OrderBy } from 'src/data/subgraph/sdk.generated'
import { useEnsData } from 'src/hooks/useEnsData'
import { propPageWrapper } from 'src/styles/Proposals.css'

import { DecodedTransactions } from './DecodedTransactions'
import { proposalDescription } from './ProposalDescription.css'

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

export const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  proposal,
  collection,
}) => {
  const { description, proposer, calldatas, values, targets } = proposal
  const { displayName } = useEnsData(proposer)

  const { data: tokenImage, error } = useSWR(
    !!collection && !!proposer ? [SWR_KEYS.TOKEN_IMAGE, collection, proposer] : null,
    async (_, collection, proposer) => {
      const data = await sdk.tokens({
        where: { owner: proposer, tokenContract: collection },
        first: 1,
        orderBy: Token_OrderBy.MintedAt,
        orderDirection: OrderDirection.Asc,
      })
      return data?.tokens?.[0]?.image
    },
    { revalidateOnFocus: false }
  )

  return (
    <Flex className={propPageWrapper}>
      <Flex direction={'column'} mt={{ '@initial': 'x6', '@768': 'x13' }}>
        <Section title="Description">
          <Paragraph overflow={'auto'}>
            <ReactMarkdown
              className={proposalDescription}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
            >
              {description}
            </ReactMarkdown>
          </Paragraph>
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
    </Flex>
  )
}
