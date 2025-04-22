import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useContractReads } from 'wagmi'

import { Avatar } from 'src/components/Avatar/Avatar'
import { Icon } from 'src/components/Icon'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { OptionalLink } from 'src/components/OptionalLink'
import { metadataAbi, tokenAbi } from 'src/data/contract/abis'
import { Queue, TransactionType, useProposalStore } from 'src/modules/create-proposal'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

interface ProposalNavigationProps {
  transactionType?: TransactionType
  handleBack?: () => void
}

export const ProposalNavigation: React.FC<ProposalNavigationProps> = ({
  transactionType,
  handleBack,
}) => {
  const router = useRouter()
  const chain = useChainStore((x) => x.chain)
  const addresses = useDaoStore((state) => state.addresses)
  const transactions = useProposalStore((state) => state.transactions)
  const [queueModalOpen, setQueueModalOpen] = useState(false)

  const token = addresses?.token
  const metadata = addresses?.metadata

  const { data: contractData } = useContractReads({
    allowFailure: false,
    enabled: !!token && !!metadata,
    contracts: [
      {
        abi: tokenAbi,
        address: token as AddressType,
        chainId: chain.id,
        functionName: 'name',
      },
      {
        abi: metadataAbi,
        address: metadata as AddressType,
        chainId: chain.id,
        functionName: 'contractImage',
      },
    ] as const,
  })

  const [name, daoImage] = unpackOptionalArray(contractData, 2)

  const daoImageSrc = React.useMemo(() => {
    return daoImage ? getFetchableUrl(daoImage) : null
  }, [daoImage])

  const handleNavigation = () => {
    handleBack ? handleBack() : router.back()
  }

  return (
    <Flex direction={'column'} w={'100%'} align={'center'} mt={'x8'}>
      <Flex w={'100%'} justify="space-between">
        <Box onClick={handleNavigation} aria-label="Back" cursor={'pointer'}>
          <Flex direction={'row'} align={'center'} gap={'x2'}>
            <Icon id="arrowLeft" />
            {name}
            {daoImageSrc}

            {daoImageSrc ? (
              <Box mr="x2">
                <Image
                  src={daoImageSrc}
                  layout="fixed"
                  objectFit="contain"
                  style={{ borderRadius: '100%' }}
                  alt=""
                  height={32}
                  width={32}
                />
              </Box>
            ) : (
              <Box mr="x2" borderRadius="phat">
                <Avatar address={token ?? undefined} size="32" />
              </Box>
            )}

            {name && (
              <Text data-testid="dao-name" fontSize={16} fontWeight={'display'}>
                {name}
              </Text>
            )}
          </Flex>
        </Box>
        {transactionType ? (
          <Box>
            <Flex>
              <Button mr="x6" variant="secondary" onClick={() => setQueueModalOpen(true)}>
                {`${transactions.length} transactions queued`}
              </Button>
              <OptionalLink
                enabled={!!transactions.length}
                href={`/dao/${chain.slug}/${token}/proposal/review`}
              >
                <Button disabled={!transactions.length}>Continue</Button>
              </OptionalLink>
            </Flex>
          </Box>
        ) : null}
      </Flex>
      <AnimatedModal close={() => setQueueModalOpen(false)} open={queueModalOpen}>
        <Queue setQueueModalOpen={setQueueModalOpen} />
      </AnimatedModal>
    </Flex>
  )
}
