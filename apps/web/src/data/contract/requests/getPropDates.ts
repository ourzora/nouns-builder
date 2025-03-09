import axios from 'axios';
import { checksumAddress, isAddress } from 'viem';
import { CHAIN_ID } from 'src/typings';

interface AttestationResponse {
  data: {
    attestations: Array<{
      attester: string;
      recipient: string;
      decodedDataJson: string;
      timeCreated: number;
      txid: string;
    }>;
  };
}

interface DecodedData {
  name: string;
  type: string;
  value: {
    type: string;
    value: string;
  };
}

export interface PropDate {
  txid: string;
  attester: string | undefined;
  propId: number;
  replyTo: string | undefined;
  response: string | undefined;
  milestoneId: number;
  timeCreated: number;
}

const ATTESTATION_SCHEMA_UID = '0x9ee9a1bfbf4f8f9b977c6b30600d6131d2a56d0be8100e2238a057ea8b18be7e';

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
};

const getDecodedValue = (decoded: DecodedData[], name: string): string | undefined => {
  return decoded.find(d => d.name === name)?.value.value;
};

export async function getPropDates(
  daoTreasuryAddress: string,
  chainId: CHAIN_ID,
  propId: string,
  timeCreated: number
): Promise<PropDate[]> {
  // Input validation
  if (!isAddress(daoTreasuryAddress)) {
    console.error('Invalid DAO treasury address');
    return [];
  }

  const attestationUrl = ATTESTATION_URL[chainId];
  if (!attestationUrl) {
    console.error('Invalid chain ID or no URL found');
    return [];
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
        recipient
        decodedDataJson
        timeCreated
        txid
      }
    }
  `;

  try {
    const { data: { data: { attestations } } } = await axios.post<AttestationResponse>(attestationUrl, { query }, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!attestations || attestations.length === 0) {
      console.warn('No attestations found');
      return [];
    }

    return attestations.map(attestation => {
      const decodedData = JSON.parse(attestation.decodedDataJson) as DecodedData[];
      return {
        attester: attestation.attester,
        propId: Number(getDecodedValue(decodedData, 'propId') ?? 0),
        replyTo: getDecodedValue(decodedData, 'replyTo'),
        response: getDecodedValue(decodedData, 'response'),
        milestoneId: Number(getDecodedValue(decodedData, 'milestoneId') ?? 0),
        timeCreated: attestation.timeCreated,
        txid: attestation.txid,
      };
    }).filter(date => date.propId === Number(propId))
    .sort((a, b) => a.timeCreated - b.timeCreated);
  } catch (error) {
    console.error('Error fetching attestations:', error instanceof Error ? error.message : String(error));
    return [];
  }
}
