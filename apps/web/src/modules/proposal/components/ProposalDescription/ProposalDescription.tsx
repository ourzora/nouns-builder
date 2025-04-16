import { Box, Flex, Paragraph, Text, atoms } from '@zoralabs/zord'
import { toLower } from 'lodash'
import Image from 'next/image'
import { Suspense } from 'react'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import useSWR from 'swr'

import SWR_KEYS from 'src/constants/swrKeys'
import { SDK } from 'src/data/subgraph/client'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { OrderDirection, Token_OrderBy } from 'src/data/subgraph/sdk.generated'
import { useEnsData } from 'src/hooks/useEnsData'
import { getEscrowBundler } from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import { useChainStore } from 'src/stores/useChainStore'
import { propPageWrapper } from 'src/styles/Proposals.css'

import { DecodedTransactions } from './DecodedTransactions'
import { MilestoneDetails } from './MilestoneDetails'
import { proposalDescription } from './ProposalDescription.css'
import { useDecodedTransactions } from './useDecodedTransactions';

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
  const { description, proposer, calldatas, values, targets, executionTransactionHash } =
    proposal

  const { displayName } = useEnsData(proposer)
  const chain = useChainStore((x) => x.chain)

  const decodedTransactions = useDecodedTransactions(
    targets,
    calldatas,
    values);

  const escrowIndex = targets.findIndex(t => t === toLower(getEscrowBundler(chain.id)))
  const decodedEscrowTransaction = escrowIndex !== -1 && decodedTransactions ? decodedTransactions[escrowIndex] : undefined
  const decodedEscrowData = !!decodedEscrowTransaction && !decodedEscrowTransaction.isNotDecoded ? decodedEscrowTransaction.transaction : undefined
  const decodedTxnArgs = !!decodedEscrowData ? decodedEscrowData.args : undefined

  const { data: tokenImage, error } = useSWR(
    !!collection && !!proposer
      ? [SWR_KEYS.TOKEN_IMAGE, chain.id, collection, proposer]
      : null,
    async (_, chainId, collection, proposer) => {
      const data = await SDK.connect(chainId).tokens({
        where: { owner: proposer.toLowerCase(), tokenContract: collection.toLowerCase() },
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
        {!!decodedEscrowData && (
          <Section title="Escrow Milestones">
            <Suspense fallback={<Text variant="code">Loading escrow milestones...</Text>}>
              {decodedTxnArgs?._escrowData?.value ? (
                <MilestoneDetails
                  decodedTxnArgs={decodedTxnArgs}
                  executionTransactionHash={executionTransactionHash}
                />
              ) : (
                <Text variant="code" color="negative">
                  Error Decoding Escrow Milestones
                </Text>
              )}
            </Suspense>
          </Section>
        )}

        <Section title="Description">
          <Paragraph overflow={'auto'}>
            {description && (
              <ReactMarkdown
                className={proposalDescription}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                remarkPlugins={[remarkGfm]}
              >
                {description}
              </ReactMarkdown>
            )}
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
          <DecodedTransactions
            decodedTransactions={decodedTransactions}
          />
        </Section>
      </Flex>
    </Flex>
  )
}
