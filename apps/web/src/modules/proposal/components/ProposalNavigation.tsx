import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { getFetchableUrl } from 'ipfs-service'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useContractReads } from 'wagmi'

import { Icon } from 'src/components/Icon'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { OptionalLink } from 'src/components/OptionalLink'
import { metadataAbi, tokenAbi } from 'src/data/contract/abis'
import { Queue, TransactionType, useProposalStore } from 'src/modules/create-proposal'
import { useDaoStore } from 'src/modules/dao'

interface ProposalNavigationProps {
  transactionType?: TransactionType
  handleBack?: () => void
}

export const ProposalNavigation: React.FC<ProposalNavigationProps> = ({
  transactionType,
  handleBack,
}) => {
  const router = useRouter()
  const addresses = useDaoStore((state) => state.addresses)
  const transactions = useProposalStore((state) => state.transactions)
  const [queueModalOpen, setQueueModalOpen] = useState(false)

  const token = addresses?.token
  const metadata = addresses?.metadata

  const { data } = useContractReads({
    enabled: !!token && !!metadata,
    contracts: [
      { abi: metadataAbi, address: metadata, functionName: 'contractImage' },
      { abi: tokenAbi, address: token, functionName: 'name' },
    ],
  })

  const handleNavigation = () => {
    handleBack ? handleBack() : router.back()
  }

  return (
    <Flex direction={'column'} w={'100%'} align={'center'} mt={'x8'}>
      <Flex w={'100%'} justify="space-between">
        <Box onClick={handleNavigation} aria-label="Back" cursor={'pointer'}>
          <Flex direction={'row'} align={'center'} gap={'x2'}>
            <Icon id="arrowLeft" />

            <Box
              backgroundColor="background2"
              width={'x8'}
              height={'x8'}
              mr={'x2'}
              position="relative"
              style={{ borderRadius: '8px' }}
            >
              {!!data ? (
                <Image
                  data-testid="dao-image"
                  src={getFetchableUrl(data[0]) as string}
                  alt={`${data[1]} avatar`}
                  height={32}
                  width={32}
                  style={{ borderRadius: '8px' }}
                />
              ) : null}
            </Box>

            {!!data && (
              <Text data-testid="dao-name" fontSize={16} fontWeight={'display'}>
                {data[1]}
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
                href={`/dao/${token}/proposal/review`}
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
