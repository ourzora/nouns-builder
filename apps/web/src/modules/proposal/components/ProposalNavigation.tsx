import React from 'react'
import { Flex, Text, Box } from '@zoralabs/zord'
import Image from 'next/legacy/image'
import { Icon } from 'src/components/Icon/Icon'
import { getFetchableUrl } from 'ipfs-service'
import { useDaoStore } from 'src/stores'
import { useContractReads } from 'wagmi'
import { metadataAbi, tokenAbi } from 'src/data/contract/abis'
import { useRouter } from 'next/router'

interface ProposalNavigationProps {
  handleBack?: () => void
}

export const ProposalNavigation: React.FC<ProposalNavigationProps> = ({ handleBack }) => {
  const router = useRouter()
  const addresses = useDaoStore((state) => state.addresses)

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
      <Flex w={'100%'}>
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
      </Flex>
    </Flex>
  )
}
