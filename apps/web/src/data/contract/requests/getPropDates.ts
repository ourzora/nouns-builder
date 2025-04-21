import axios from 'axios'
import { checksumAddress, isAddress } from 'viem'

import { CHAIN_ID } from 'src/typings'

interface Attestation {
  attester: string
  recipient: string
  schemaId: string
  refUID: string
  decodedDataJson: string
  timeCreated: number
  txid: string
}

interface AttestationResponse {
  data: {
    attestations: Attestation[]
  }
}

interface DecodedData {
  name: string
  type: string
  value: {
    type: string
    value: string
  }
}

export interface PropDate {
  txid: string
  attester: string | undefined
  schemaId: string
  refUID: string
  proposalId: string | undefined
  originalMessageId: string | undefined
  messageType: number
  message: string | undefined
  timeCreated: number
}

export const ATTESTATION_SCHEMA_UID =
  '0x8bd0d42901ce3cd9898dbea6ae2fbf1e796ef0923e7cbb0a1cecac2e42d47cb3'

// Add the canonical EAS contract address
export const EAS_CONTRACT_ADDRESS: Record<CHAIN_ID, `0x${string}` | ''> = {
  [CHAIN_ID.ETHEREUM]: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce583',
  [CHAIN_ID.OPTIMISM]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.BASE]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.SEPOLIA]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.OPTIMISM_SEPOLIA]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.BASE_SEPOLIA]: '0x4200000000000000000000000000000000000021',
  [CHAIN_ID.ZORA]: '', // Zora doesn't have a canonical EAS deployment yet
  [CHAIN_ID.ZORA_SEPOLIA]: '',
  [CHAIN_ID.FOUNDRY]: '', // Assuming no specific address for Foundry
}

const ATTESTATION_URL: Record<CHAIN_ID, string> = {
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

export async function getPropDates(
  daoTreasuryAddress: string,
  chainId: CHAIN_ID,
  propId: string,
  timeCreated: number
): Promise<PropDate[]> {
  // Input validation
  if (!isAddress(daoTreasuryAddress)) {
    console.error('Invalid DAO treasury address')
    return []
  }

  const attestationUrl = ATTESTATION_URL[chainId]
  if (!attestationUrl) {
    console.error('Invalid chain ID or no URL found')
    return []
  }

  const query = `
    query Attestations {
      attestations(
        where: {
          schemaId: { equals: "${ATTESTATION_SCHEMA_UID}" }
          recipient: { equals: "${checksumAddress(daoTreasuryAddress)}" }
        }
      ) {
        attester
        schemaId
        refUID
        recipient
        decodedDataJson
        timeCreated
        txid
      }
    }
  `

  try {
    const {
      data: {
        data: { attestations },
      },
    } = await axios.post<AttestationResponse>(
      attestationUrl,
      { query },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!attestations || attestations.length === 0) {
      console.warn('No attestations found')
      return []
    }

    return attestations
      .map((attestation: Attestation): PropDate => {
        const decodedData = JSON.parse(attestation.decodedDataJson) as DecodedData[]
        return {
          attester: attestation.attester,
          schemaId: attestation.schemaId,
          refUID: attestation.refUID,
          proposalId: getDecodedValue(decodedData, 'proposalId'),
          originalMessageId: getDecodedValue(decodedData, 'originalMessageId'),
          messageType: Number(getDecodedValue(decodedData, 'messageType') ?? 0),
          message: getDecodedValue(decodedData, 'message'),
          timeCreated: attestation.timeCreated,
          txid: attestation.txid,
        }
      })
      .filter((date: PropDate) => date.proposalId === propId)
      .sort((a: PropDate, b: PropDate) => a.timeCreated - b.timeCreated)
  } catch (error) {
    console.error(
      'Error fetching attestations:',
      error instanceof Error ? error.message : String(error)
    )
    return []
  }
}
