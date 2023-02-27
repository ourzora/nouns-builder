import { Box, Flex, Stack, Text, atoms } from '@zoralabs/zord'
import axios from 'axios'
import { ethers } from 'ethers'
import React, { Fragment } from 'react'
import { ETHERSCAN_BASE_URL, ETHER_ACTOR_BASE_URL } from 'src/constants/etherscan'
import SWR_KEYS from 'src/constants/swrKeys'
import { walletSnippet } from 'src/utils/helpers'
import useSWR from 'swr'

interface DecodedTransactionProps {
  targets: string[]
  calldatas: string[]
  values: string[]
}
export const DecodedTransactions: React.FC<DecodedTransactionProps> = ({
  targets,
  calldatas,
  values,
}) => {
  /*
  
    format in shape defined in ethers actor
  
   */
  const formatSendEth = (value: string) => {
    const amount = ethers.utils.formatEther(value)
    return {
      functionName: 'Transfer',
      name: 'Transfer',
      args: {
        ['Transfer']: { name: `value`, value: `${amount} ETH` },
      },
    }
  }

  const decodeTransaction = async (target: string, calldata: string, value: string) => {
    /* if calldata is '0x' */
    const isTransfer = calldata === '0x'

    if (isTransfer) {
      return formatSendEth(value)
    }

    try {
      const decoded = await axios(`${ETHER_ACTOR_BASE_URL}/decode/${target}/${calldata}`)

      if (decoded?.data?.statusCode) return calldata

      return decoded.data
    } catch (err) {
      console.log('err', err)

      // if err return original calldata
      return calldata
    }
  }

  const { data: decodedTransactions } = useSWR(
    targets && calldatas && values
      ? [SWR_KEYS.PROPOSALS_TRANSACTIONS, targets, calldatas, values]
      : null,
    async (_, targets, calldatas, values) => {
      return await Promise.all(
        targets.map(async (target, i) => {
          const transaction = await decodeTransaction(target, calldatas[i], values[i])

          return {
            target,
            transaction,
            isNotDecoded: transaction === calldatas[i],
          }
        })
      )
    },
    { revalidateOnFocus: false }
  )

  return (
    <Stack style={{ maxWidth: 600, wordBreak: 'break-word' }}>
      <ol>
        {decodedTransactions?.map((decoded, i) => (
          <Fragment key={`${decoded.target}-${i}`}>
            {decoded.isNotDecoded ? (
              <li className={atoms({ paddingBottom: 'x4' })}>{decoded.transaction}</li>
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
                        href={`${ETHERSCAN_BASE_URL}/address/${decoded?.target}`}
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
                      {`.${decoded?.transaction?.functionName}(`}
                      {!decoded?.transaction?.args &&
                        !decoded.transaction.decoded.length &&
                        `)`}
                    </Flex>
                    <Stack pl={'x4'} gap={'x1'}>
                      {(decoded?.transaction?.args &&
                        Object?.values(decoded?.transaction?.args).map((arg: any) => (
                          // if verified contract and arguments object {name, value}
                          <Flex key={arg?.name}>
                            {arg?.name}: {arg?.value}
                          </Flex>
                        ))) ||
                        // if unverified contract and arguments array [value]
                        (decoded?.transaction?.decoded &&
                          decoded?.transaction?.decoded?.map((arg: any) => (
                            <Flex key={arg}>{arg}</Flex>
                          )))}
                    </Stack>
                    {(!!decoded?.transaction?.args ||
                      !!decoded?.transaction.decoded.length) &&
                      `)`}
                  </Stack>
                </Stack>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Stack>
  )
}
