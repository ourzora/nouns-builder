import axios from 'axios'
import { checksumAddress, isAddress } from 'viem'

import { CHAIN_ID } from 'src/typings'

interface AttestationResponse {
  data: {
    attestations: Array<{
      attester: string
      recipient: string
      decodedDataJson: string
    }>
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

const ATTESTATION_SCHEMA_UID = `0x1289c5f988998891af7416d83820c40ba1c6f5ba31467f2e611172334dc53a0e`
const SMART_INVOICE_MULTISIG = `0x503a5161D1c5D9d82BF35a4c80DA0C3Ad72d9244` // TODO: replace with actual multisig address
const BUILDER_DAO_TREASURY = `0xcf325a4c78912216249b818521b0798a0f904c10`
const BUILDER_DAO_OPS_MULTISIG = `0x58eAEfBEd9EEFbC564E302D0AfAE0B113E42eAb3`

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

export async function getEscrowDelegate(
  daoTreasuryAddress: string,
  chainId: CHAIN_ID
): Promise<string | null> {
  // Input validation
  if (!daoTreasuryAddress || !isAddress(daoTreasuryAddress)) {
    return null
  }

  const attestationUrl = ATTESTATION_URL[chainId]
  if (!attestationUrl) {
    return null
  }

  const attestationIssuerPriorityOrder = [
    checksumAddress(daoTreasuryAddress),
    checksumAddress(BUILDER_DAO_TREASURY),
    checksumAddress(BUILDER_DAO_OPS_MULTISIG),
    checksumAddress(SMART_INVOICE_MULTISIG),
  ]

  const query = `
  query Attestations {
    attestations(
      where: {
        schemaId: { equals: "${ATTESTATION_SCHEMA_UID}" }
        attester: { in: ["${attestationIssuerPriorityOrder.join('","')}"] }
        recipient: { equals: "${checksumAddress(daoTreasuryAddress)}" }
      }
    ) {
      attester
      recipient
      decodedDataJson
    }
  }
`

  try {
    const response = await axios.post<AttestationResponse>(
      attestationUrl,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const attestations = response?.data?.data?.attestations

    // Sort attestations based on priority order
    const sortedAttestations = attestations.sort((a, b) => {
      const indexA = attestationIssuerPriorityOrder.indexOf(a.attester as `0x${string}`)
      const indexB = attestationIssuerPriorityOrder.indexOf(b.attester as `0x${string}`)
      return indexA - indexB
    })

    if (!attestations?.length) {
      return null
    }

    try {
      // Get the first attestation from priority
      const decodedData = JSON.parse(
        sortedAttestations[0].decodedDataJson
      ) as DecodedData[]

      const escrowDelegateAddress = decodedData[0]?.value?.value
      if (!escrowDelegateAddress || !isAddress(escrowDelegateAddress)) {
        return null
      }

      return escrowDelegateAddress
    } catch (parseError) {
      console.error('Error parsing attestation data:', parseError)
      return null
    }
  } catch (error) {
    console.error('Error fetching attestations:', error)
    return null
  }
}
