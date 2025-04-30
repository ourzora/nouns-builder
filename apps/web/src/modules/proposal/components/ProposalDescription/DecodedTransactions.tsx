import { Box, Flex, Stack, Text, atoms } from '@zoralabs/zord'
import { toLower } from 'lodash'
import React, { Fragment } from 'react'
import { formatEther } from 'viem'

import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import {
  ESCROW_TYPE,
  ESCROW_TYPE_V1,
  decodeEscrowData,
  decodeEscrowDataV1,
  getEscrowBundlerV1,
} from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
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

  const renderArgument = (arg: any, isEscrowV1: boolean) => {
    if (!arg) return null
    if (arg?.name === '_escrowData' && !isEscrowV1) {
      const {
        resolverAddress,
        clientAddress,
        terminationTime,
        providerRecipientAddress,
        clientRecipientAddress,
      } = decodeEscrowData(arg.value)

      if (
        !resolverAddress ||
        !clientAddress ||
        !terminationTime ||
        !providerRecipientAddress ||
        !clientRecipientAddress
      ) {
        return null
      }

      return (
        <Stack gap={'x1'} key={arg.name}>
          <Flex>_client: {clientAddress}</Flex>
          <Flex>_resolver: {resolverAddress}</Flex>
          <Flex>_providerRecipient: {providerRecipientAddress}</Flex>
          <Flex>_clientRecipient: {clientRecipientAddress}</Flex>
          <Flex>
            _safetyValveDate: {new Date(Number(terminationTime) * 1000).toLocaleString()}
          </Flex>
        </Stack>
      )
    }

    if (arg?.name === '_escrowData' && isEscrowV1) {
      const {
        providerAddress,
        resolverAddress,
        clientAddress,
        terminationTime,
        providerRecipientAddress,
        escrowType,
      } = decodeEscrowDataV1(arg.value)

      if (
        !resolverAddress ||
        !clientAddress ||
        !terminationTime ||
        !providerRecipientAddress
      ) {
        return null
      }

      return (
        <Stack gap={'x1'} key={arg.name}>
          <Flex>_client: {clientAddress}</Flex>
          <Flex>_provider: {providerAddress}</Flex>
          <Flex>_resolver: {resolverAddress}</Flex>
          <Flex>_providerRecipient: {providerRecipientAddress}</Flex>
          <Flex>
            _safetyValveDate: {new Date(Number(terminationTime) * 1000).toLocaleString()}
          </Flex>
          {escrowType && toLower(escrowType) === toLower(ESCROW_TYPE_V1) && (
            <Flex>_escrowType: updatable</Flex>
          )}
        </Stack>
      )
    }

    let value = arg.value

    if (arg.name === '_milestoneAmounts') {
      value = arg.value
        .split(',')
        .map((amt: string) => `${formatEther(BigInt(amt))} ETH`)
        .join(', ')
    } else if (arg.name === '_fundAmount') {
      value = formatEther(BigInt(arg.value)) + ' ETH'
    } else if (arg.name === '_escrowType') {
      value = toLower(arg.value) === toLower(ESCROW_TYPE) ? 'updatable-v2' : 'updatable'
    }

    return (
      <Flex key={arg.name}>
        {arg.name}: {value}
      </Flex>
    )
  }

  return (
    <Stack style={{ maxWidth: 600, wordBreak: 'break-word' }}>
      <ol>
        {decodedTransactions?.map((decoded, i) => {
          const isEscrowV1 = toLower(decoded.target).includes(
            toLower(getEscrowBundlerV1(chain.id))
          )

          return (
            <Fragment key={`${decoded.target}-${i}`}>
              {decoded.isNotDecoded ? (
                <li className={atoms({ paddingBottom: 'x4' })}>
                  {decoded.transaction.toString()}
                </li>
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
                          href={`${ETHERSCAN_BASE_URL[chain.id]}/address/${
                            decoded?.target
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
                        {`.${decoded?.transaction?.functionName}(`}
                        {!decoded?.transaction?.args &&
                          !decoded.transaction?.decoded?.length &&
                          `)`}
                      </Flex>

                      <Stack pl={'x4'} gap={'x1'}>
                        {(decoded?.transaction?.args &&
                          Object?.values(decoded?.transaction?.args).map((arg: any) =>
                            renderArgument(arg, isEscrowV1)
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
          )
        })}
      </ol>
    </Stack>
  )
}
