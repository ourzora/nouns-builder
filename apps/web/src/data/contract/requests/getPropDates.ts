import { GraphQLClient, gql } from 'graphql-request'
import { getFetchableUrl } from 'ipfs-service'
import { Hex, getAddress, isAddress, isHex } from 'viem'

import { CHAIN_ID } from 'src/typings'

interface Attestation {
  id: String
  attester: string
  recipient: string
  schemaId: string
  refUID: string
  decodedDataJson: string
  timeCreated: number
  txid: string
}

interface AttestationResponse {
  attestations: Attestation[]
}

interface DecodedData {
  name: string
  type: string
  value: {
    type: string
    value: string
  }
}

export interface PropdateMessage {
  content: string
  labels?: string[]
  attachments?: string[]
}

export enum MessageType {
  INLINE_TEXT = 0,
  INLINE_JSON,
  URL_TEXT,
  URL_JSON,
}

export interface PropDate {
  id: Hex
  attester: Hex
  proposalId: Hex
  originalMessageId: Hex
  message: string
  txid: Hex
  timeCreated: number
}

export const ATTESTATION_SCHEMA_UID =
  '0x8bd0d42901ce3cd9898dbea6ae2fbf1e796ef0923e7cbb0a1cecac2e42d47cb3'

// Add the canonical EAS contract address
export const EAS_CONTRACT_ADDRESS: Record<CHAIN_ID, `0x${string}` | ''> = {
  [CHAIN_ID.ETHEREUM]: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  [CHAIN_ID.OPTIMISM]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.BASE]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.SEPOLIA]: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  [CHAIN_ID.OPTIMISM_SEPOLIA]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.BASE_SEPOLIA]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.ZORA]: '', // Zora doesn't have a canonical EAS deployment yet
  [CHAIN_ID.ZORA_SEPOLIA]: '',
  [CHAIN_ID.FOUNDRY]: '', // Assuming no specific address for Foundry
}

const EAS_GRAPHQL_URL: Record<CHAIN_ID, string> = {
  [CHAIN_ID.ETHEREUM]: 'https://easscan.org/graphql',
  [CHAIN_ID.OPTIMISM]: 'https://optimism.easscan.org/graphql',
  [CHAIN_ID.SEPOLIA]: 'https://sepolia.easscan.org/graphql',
  [CHAIN_ID.OPTIMISM_SEPOLIA]: 'https://optimism-sepolia.easscan.org/graphql',
  [CHAIN_ID.BASE]: 'https://base.easscan.org/graphql',
  [CHAIN_ID.BASE_SEPOLIA]: 'https://base-sepolia.easscan.org/graphql',
  [CHAIN_ID.ZORA]: '',
  [CHAIN_ID.ZORA_SEPOLIA]: '',
  [CHAIN_ID.FOUNDRY]: '',
}

const getDecodedValue = (decoded: DecodedData[], name: string): string | undefined => {
  return decoded.find((d) => d.name === name)?.value.value
}

// NOTE: Zora is not supported by EAS yet
export const isChainIdSupportedForPropDates = (chainId: CHAIN_ID): boolean => {
  return !!EAS_GRAPHQL_URL[chainId]
}

const REQUEST_TIMEOUT = 10000 // 10s

const fetchWithTimeout = async (url: string) => {
  try {
    const controller = new AbortController()
    const { signal } = controller

    // Set a 10s timeout for the request
    const timeoutId = setTimeout(function () {
      controller.abort()
    }, REQUEST_TIMEOUT)

    const res = await fetch(url, { signal })
    clearTimeout(timeoutId)

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status.toString()}`)
    }

    return await res.text()
  } catch (error) {
    console.error(`Failed to fetch from URL: ${url}`, error)
    throw new Error(`Failed to fetch from URL: ${url}`)
  }
}

const fetchFromURI = async (uri: string): Promise<string> => {
  const url = getFetchableUrl(uri)
  if (!url) {
    throw new Error('Invalid URI')
  }
  return fetchWithTimeout(url)
}

const getPropdateMessage = async (
  messageType: number,
  message: string
): Promise<PropdateMessage> => {
  try {
    switch (messageType) {
      case MessageType.INLINE_JSON:
        return JSON.parse(message) as PropdateMessage
      case MessageType.URL_JSON: {
        const response = await fetchFromURI(message)
        return JSON.parse(response) as PropdateMessage
      }
      case MessageType.URL_TEXT: {
        const response = await fetchFromURI(message)
        return { content: response } as PropdateMessage
      }
      default:
        return { content: message } as PropdateMessage
    }
  } catch (error) {
    console.error(
      'Error parsing propdate message:',
      error instanceof Error ? error.message : String(error)
    )
    return { content: message } as PropdateMessage
  }
}

export async function getPropDates(
  daoTreasuryAddress: string,
  chainId: CHAIN_ID,
  propId: string
): Promise<PropDate[]> {
  // Input validation
  if (!isAddress(daoTreasuryAddress)) {
    console.error('Invalid DAO treasury address')
    return []
  }

  if (!isChainIdSupportedForPropDates(chainId)) {
    console.error('Chain ID not supported')
    return []
  }

  if (!propId || !isHex(propId)) {
    console.error('Invalid proposal ID')
    return []
  }

  const easGraphqlUrl = EAS_GRAPHQL_URL[chainId]
  if (!easGraphqlUrl) {
    console.error('Attestation URL not found')
    return []
  }

  const query = gql`
    query Attestations($schemaId: String!, $recipient: String!) {
      attestations(
        where: { schemaId: { equals: $schemaId }, recipient: { equals: $recipient } }
      ) {
        id
        attester
        refUID
        recipient
        decodedDataJson
        timeCreated
        txid
      }
    }
  `

  try {
    const client = new GraphQLClient(easGraphqlUrl)
    const variables = {
      schemaId: ATTESTATION_SCHEMA_UID,
      recipient: getAddress(daoTreasuryAddress),
    }

    const { attestations } = await client.request<AttestationResponse>(query, variables)

    if (!attestations || attestations.length === 0) {
      console.warn('No attestations found')
      return []
    }

    const propdatePromises = attestations.map(
      async (attestation: Attestation): Promise<PropDate> => {
        const decodedData = JSON.parse(attestation.decodedDataJson) as DecodedData[]
        const messageType = Number(
          getDecodedValue(decodedData, 'messageType') ?? 0
        ) as MessageType
        const message = getDecodedValue(decodedData, 'message') as string
        const parsedMessage = await getPropdateMessage(messageType, message)
        const propdate: PropDate = {
          id: attestation.id as Hex,
          attester: attestation.attester as Hex,
          proposalId: getDecodedValue(decodedData, 'proposalId') as Hex,
          originalMessageId: getDecodedValue(decodedData, 'originalMessageId') as Hex,
          message: parsedMessage.content,
          timeCreated: attestation.timeCreated,
          txid: attestation.txid as Hex,
        }
        return propdate
      }
    )

    const propdates = await Promise.all(propdatePromises)

    return propdates
      .filter((p: PropDate) => p.proposalId.toLowerCase() === propId.toLowerCase())
      .sort((a: PropDate, b: PropDate) => a.timeCreated - b.timeCreated)
  } catch (error) {
    console.error(
      'Error fetching attestations:',
      error instanceof Error ? error.message : String(error)
    )
    return []
  }
}
