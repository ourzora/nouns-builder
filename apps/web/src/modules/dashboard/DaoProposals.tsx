import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { Avatar } from 'src/components/Avatar'
import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'

import { DaoProposalCard } from './DaoProposalCard'
import { DashboardDao } from './Dashboard'

export const DaoProposals = ({
  daoImage,
  tokenAddress,
  name,
  proposals,
  chainId,
}: DashboardDao) => {
  const daoImageSrc = React.useMemo(() => {
    return daoImage ? getFetchableUrl(daoImage) : null
  }, [daoImage])

  const router = useRouter()

  const currentChainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  return (
    <Box mb={'x10'}>
      <Flex justify={'space-between'} mb={'x6'}>
        <Flex align={'center'}>
          {daoImageSrc ? (
            <Box mr="x4">
              <Image
                src={daoImageSrc}
                layout="fixed"
                objectFit="contain"
                style={{ borderRadius: '12px' }}
                alt=""
                height={48}
                width={48}
              />
            </Box>
          ) : (
            <Box mr="x4" borderRadius="phat">
              <Avatar address={tokenAddress ?? undefined} size="52" />
            </Box>
          )}
          <Text fontSize={20} fontWeight="label">
            {name}
          </Text>
        </Flex>

        <Button
          variant="outline"
          borderRadius="curved"
          onClick={() =>
            router.push(`/dao/${currentChainSlug}/${tokenAddress}/proposal/create`)
          }
        >
          Submit Proposal
        </Button>
      </Flex>
      {proposals.map((proposal) => (
        <DaoProposalCard
          key={proposal.proposalNumber}
          {...proposal}
          chainId={chainId}
          tokenAddress={tokenAddress}
        />
      ))}
    </Box>
  )
}
