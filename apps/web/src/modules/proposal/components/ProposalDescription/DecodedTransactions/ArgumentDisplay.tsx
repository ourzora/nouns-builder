import { Flex, Stack, Text } from '@zoralabs/zord'
import { toLower } from 'lodash'
import { Hex, formatEther } from 'viem'

import {
  ESCROW_TYPE,
  ESCROW_TYPE_V1,
  decodeEscrowData,
  decodeEscrowDataV1,
} from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import {
  getEscrowBundler,
  getEscrowBundlerV1,
} from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import { useChainStore } from 'src/stores/useChainStore'
import { DecodedArg, DecodedValue } from 'src/typings'

export const ArgumentDisplay: React.FC<{
  arg: DecodedArg
  target: string
}> = ({ arg, target }) => {
  const chain = useChainStore((x) => x.chain)
  if (!arg) return null

  if (
    arg?.name === '_escrowData' &&
    toLower(target) === toLower(getEscrowBundler(chain.id))
  ) {
    const {
      resolverAddress,
      clientAddress,
      terminationTime,
      providerRecipientAddress,
      clientRecipientAddress,
    } = decodeEscrowData(arg.value as Hex)

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

  if (
    arg?.name === '_escrowData' &&
    toLower(target) === toLower(getEscrowBundlerV1(chain.id))
  ) {
    const {
      providerAddress,
      resolverAddress,
      clientAddress,
      terminationTime,
      providerRecipientAddress,
      escrowType,
    } = decodeEscrowDataV1(arg.value as Hex)

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

  if (
    toLower(target) === toLower(getEscrowBundler(chain.id)) ||
    toLower(target) === toLower(getEscrowBundlerV1(chain.id))
  ) {
    if (arg.name === '_milestoneAmounts') {
      value = arg.value
        .toString()
        .split(',')
        .map((amt: string) => `${formatEther(BigInt(amt))} ETH`)
        .join(', ')
    } else if (arg.name === '_fundAmount') {
      value = formatEther(BigInt(arg.value.toString())) + ' ETH'
    } else if (arg.name === '_escrowType') {
      value =
        toLower(arg.value.toString()) === toLower(ESCROW_TYPE)
          ? 'updatable-v2'
          : 'updatable'
    }
  }

  return <DecodedValueRenderer {...{ name: arg.name, value }} />
}

interface DecodedValueRendererProps {
  name: string
  value: DecodedValue
}

export const DecodedValueRenderer: React.FC<DecodedValueRendererProps> = ({
  name,
  value,
}) => {
  if (typeof value === 'string') {
    return (
      <Flex key={name} align="flex-start" w="100%">
        <Text pr="x1" style={{ flexShrink: 0 }}>
          {name}:
        </Text>
        <Text>{value}</Text>
      </Flex>
    )
  }

  if (Array.isArray(value)) {
    return (
      <>
        <Flex wrap="wrap" align="flex-start">
          <Text pr="x1" style={{ flexShrink: 0 }}>
            {name}:
          </Text>
          <Text>[</Text>
        </Flex>
        <Stack pl="x4" gap="x1">
          {value.map((item, index) => (
            <DecodedValueRenderer
              key={`${name}-${index}`}
              name={`[${index}]`}
              value={item}
            />
          ))}
        </Stack>
        <Text>]</Text>
      </>
    )
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <>
        <Flex wrap="wrap" align="flex-start">
          <Text pr="x1" style={{ flexShrink: 0 }}>
            {name}:
          </Text>
          <Text>{'{'}</Text>
        </Flex>
        <Stack pl="x4" gap="x1">
          {Object.entries(value).map(([key, val], i) => (
            <DecodedValueRenderer key={`${key}-${i}`} name={key} value={val} />
          ))}
        </Stack>
        <Text>{'}'}</Text>
      </>
    )
  }

  return <DecodedValueRenderer {...{ name, value: JSON.stringify(value) }} /> // fallback
}
