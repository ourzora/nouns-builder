import { Box, Flex, Stack, Text, atoms } from '@zoralabs/zord'
import { toLower } from 'lodash'
import { get } from 'lodash'
import React, { Fragment } from 'react'
import { decodeAbiParameters, formatEther, parseAbiParameters } from 'viem'

import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { getEscrowBundler } from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import { useChainStore } from 'src/stores/useChainStore'
import { walletSnippet } from 'src/utils/helpers'
import { DecodedTransaction } from './useDecodedTransactions'

interface DecodedTransactionProps {
  decodedTransactions: DecodedTransaction[] | undefined
}

export const DecodedTransactions: React.FC<DecodedTransactionProps> = ({
  decodedTransactions,
}) => {
  const chain = useChainStore((x) => x.chain)

  const renderArgument = (arg: any) => {
    if (arg?.name === '_escrowData') {
      // Decode escrow data
      const decodedAbiData = decodeAbiParameters(
        parseAbiParameters([
          'address client',
          'address resolver',
          'uint8 resolverType',
          'address token',
          'uint256 terminationTime',
          'bytes32 details',
          'address provider',
          'address providerReceiver',
          'bool requireVerification',
          'bytes32 escrowType',
        ]),
        arg.value
      )

      return (
        <Stack pl={'x2'} gap={'x1'}>
          <Flex>client/signer: {get(decodedAbiData, '[0]', '')}</Flex>
          <Flex>resolver: {get(decodedAbiData, '[1]', '')}</Flex>
          <Flex>
            Safety Valve Date:{' '}
            {new Date(Number(get(decodedAbiData, '[4]', 0)) * 1000).toLocaleString()}
          </Flex>
          <Flex>Service Provider: {get(decodedAbiData, '[6]', '')}</Flex>
        </Stack>
      )
    }

    return (
      <Flex key={arg?.name}>
        {arg?.name}:{' '}
        {arg?.name === '_milestoneAmounts'
          ? arg.value
            .split(',')
            .map((amt: string) => `${formatEther(BigInt(amt))} ETH`)
            .join(', ')
          : arg?.name === '_fundAmount'
            ? formatEther(BigInt(arg?.value)) + ' ETH'
            : arg?.value}
      </Flex>
    )
  }

  return (
    <Stack style={{ maxWidth: 600, wordBreak: 'break-word' }}>
      <ol>
        {decodedTransactions?.map((decoded, i) => {
          const isEscrow = toLower(decoded.target).includes(toLower(getEscrowBundler(chain.id)))

          return (
            <Fragment key={`${decoded.target}-${i}`}>
              {decoded.isNotDecoded ? (
                <li className={atoms({ paddingBottom: 'x4' })}>{decoded.transaction.toString()}</li>
              ) : (
                <li className={atoms({ paddingBottom: 'x4' })}>
                  <Stack>
                    <Stack gap={'x1'}>
                      <Box
                        color={'secondary'}
                        fontWeight={'heading'}
                        className={atoms({ textDecoration: 'underline' })}
                      >
                        <a
                          href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${decoded?.target
                            }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Text display={{ '@initial': 'flex', '@768': 'none' }}>
                            {walletSnippet(decoded?.target)}
                          </Text>
                          <Text display={{ '@initial': 'none', '@768': 'flex' }}>
                            {decoded?.target}
                          </Text>
                        </a>
                      </Box>
                      <Flex pl={'x2'}>
                        {`.${!isEscrow ? decoded?.transaction?.functionName : 'deployEscrow'
                          }(`}
                        {!decoded?.transaction?.args &&
                          !decoded.transaction?.decoded?.length &&
                          `)`}
                      </Flex>

                      <Stack pl={'x4'} gap={'x1'}>
                        {(decoded?.transaction?.args &&
                          Object?.values(decoded?.transaction?.args).map((arg: any) =>
                            renderArgument(arg)
                          )) ||
                          (decoded?.transaction?.decoded &&
                            decoded?.transaction?.decoded?.map((arg: any) => (
                              <Flex key={arg}>{arg}</Flex>
                            )))}
                      </Stack>

                      {(!!decoded?.transaction?.args ||
                        !!decoded?.transaction?.decoded?.length) &&
                        `)`}
                    </Stack>
                  </Stack>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </Stack>
  )
}
