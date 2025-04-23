import { getFetchableUrl } from 'ipfs-service'
import { Hex, getAddress, isAddress, isHex } from 'viem'

import { PROPDATE_SCHEMA_UID } from 'src/constants/eas'
import { SDK } from 'src/data/eas/client'
import {
  DecodedData,
  getDecodedValue,
  isChainIdSupportedByEAS,
} from 'src/data/eas/helpers'
import { AttestationFragment } from 'src/data/eas/sdk.generated'
import { CHAIN_ID } from 'src/typings'

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
  tokenAddress: string,
  chainId: CHAIN_ID,
  propId: string
): Promise<PropDate[]> {
  // Input validation
  if (!isAddress(tokenAddress)) {
    console.error('Invalid DAO token address')
    return []
  }

  if (!isChainIdSupportedByEAS(chainId)) {
    console.error('Chain ID not supported by EAS')
    return []
  }

  if (!propId || !isHex(propId)) {
    console.error('Invalid proposal ID')
    return []
  }

  try {
    const variables = {
      schemaId: PROPDATE_SCHEMA_UID,
      recipient: getAddress(tokenAddress),
    }

    const { attestations } = await SDK.connect(chainId).propdates(variables)

    if (!attestations || attestations.length === 0) {
      console.warn('No propdate attestations found')
      return []
    }

    const propdatePromises = attestations.map(
      async (attestation: AttestationFragment): Promise<PropDate> => {
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
