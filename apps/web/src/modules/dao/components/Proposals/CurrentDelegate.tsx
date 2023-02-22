import { Box, Button, Flex } from '@zoralabs/zord'
import React from 'react'
import { Icon } from 'src/components/Icon'
import { Avatar } from 'src/components/Avatar'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useEnsData } from 'src/hooks/useEnsData'
import useTokenContract from 'src/hooks/useTokenContract'
import { proposalFormTitle } from 'src/styles/Proposals.css'
import { walletSnippet } from 'src/utils/helpers'

interface CurrentDelegateProps {
  toggleIsEditing: () => void
}

export const CurrentDelegate = ({ toggleIsEditing }: CurrentDelegateProps) => {
  const { delegateAddress } = useTokenContract()
  const { ensName, ensAvatar } = useEnsData(delegateAddress as string)

  return (
    <Flex direction={'column'} width={'100%'}>
      <Box className={proposalFormTitle} fontSize={28} mb={'x4'}>
        Votes
      </Box>

      <Box mb={'x8'} color="text3">
        You can assign your votes to any address by delegating
      </Box>

      <Box mb={'x2'}>Current delegate</Box>

      <Box>
        <Flex
          align={'center'}
          height={'x16'}
          mb={'x6'}
          px={'x6'}
          borderColor="border"
          borderWidth="normal"
          borderStyle="solid"
          borderRadius="curved"
        >
          <Box mr={'x2'}>
            {ensAvatar ? (
              <img src={ensAvatar} alt="avatar" height={28} width={28} />
            ) : (
              <Avatar address={delegateAddress} size={'28'} />
            )}
          </Box>

          {ensName ? (
            <>
              <Box mr={'x2'}>{ensName}</Box>
              <Box color="text4" ml="auto">
                {walletSnippet(delegateAddress)}
              </Box>
            </>
          ) : (
            <Box mr="auto">{walletSnippet(delegateAddress)}</Box>
          )}

          <Box
            as="a"
            ml={'x3'}
            href={`${ETHERSCAN_BASE_URL}/address/${delegateAddress}`}
            target="_blank"
          >
            <Icon size="sm" id="external-16" fill="text4" />
          </Box>
        </Flex>

        <Box>
          <Button width={'100%'} onClick={toggleIsEditing} size="lg">
            Update delegate
          </Button>
        </Box>
      </Box>
    </Flex>
  )
}
