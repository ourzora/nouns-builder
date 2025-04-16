import { decode, encode } from 'bs58'
import { Address, Hex, encodeAbiParameters, toBytes, toHex } from 'viem'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CHAIN_ID } from 'src/typings'

import { EscrowFormState, EscrowFormValues } from './EscrowForm.schema'

const SMART_INVOICE_ARBITRATION_PROVIDER =
  '0x18542245cA523DFF96AF766047fE9423E0BED3C0' as Address
const ESCROW_RESOLVER_TYPE = 0
const ESCROW_REQUIRE_VERIFICATION = true
export const ESCROW_TYPE = toHex(toBytes('updatable-v2', { size: 32 }))

export function convertIpfsCidV0ToByte32(cid: string) {
  return `0x${Buffer.from(decode(cid).slice(2)).toString('hex')}`
}

export function convertByte32ToIpfsCidV0(str: Hex) {
  let newStr: string = str
  if (str.indexOf('0x') === 0) {
    newStr = str.slice(2)
  }
  return encode(Buffer.from(`1220${newStr}`, 'hex'))
}

function getWrappedTokenAddress(chainId: number | string): Address {
  chainId = Number(chainId)
  switch (chainId) {
    case CHAIN_ID.ETHEREUM:
      return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' as Address
    case CHAIN_ID.OPTIMISM:
      return '0x4200000000000000000000000000000000000006' as Address
    case CHAIN_ID.BASE:
      return '0x4200000000000000000000000000000000000006' as Address
    case CHAIN_ID.ZORA:
      return '0x4200000000000000000000000000000000000006' as Address
    case CHAIN_ID.SEPOLIA:
      return '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14' as Address
    case CHAIN_ID.OPTIMISM_SEPOLIA:
      return '0x4200000000000000000000000000000000000006' as Address
    case CHAIN_ID.BASE_SEPOLIA:
      return '0x4200000000000000000000000000000000000006' as Address
    case CHAIN_ID.ZORA_SEPOLIA:
      return '0x4200000000000000000000000000000000000006' as Address
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

function getEscrowFactory(chainId: number | string): Address {
  chainId = Number(chainId)
  switch (chainId) {
    case CHAIN_ID.ETHEREUM:
      return '0x5E14cF595e18F91170009946205f8BBa21b323ca' as Address
    case CHAIN_ID.OPTIMISM:
      return '0xF9822818143948237A60A1a1CEFC85D6F1b929Df' as Address
    case CHAIN_ID.BASE:
      return '0xF9822818143948237A60A1a1CEFC85D6F1b929Df' as Address
    case CHAIN_ID.ZORA:
      return '0x59730da9b5f93fe1e1fd7d62f94b787ecc7feef1' as Address
    case CHAIN_ID.SEPOLIA:
      return '0x8227b9868e00B8eE951F17B480D369b84Cd17c20' as Address
    case CHAIN_ID.OPTIMISM_SEPOLIA:
      return '0x4cd7beae668ed7c7803b787ba9b84ce17135646b' as Address
    case CHAIN_ID.BASE_SEPOLIA:
      return '0x851e59a39571e599954702f0e4996bf838d9c863' as Address
    case CHAIN_ID.ZORA_SEPOLIA:
      return '0x147d044faaae2b476404115192050babc9ba0e03' as Address
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

function getEscrowBundler(chainId: number | string): Address {
  chainId = Number(chainId)
  switch (chainId) {
    case CHAIN_ID.ETHEREUM:
      return '0x8f2cbf3a281092e48e0d79e0466604833e6cfa23' as Address
    case CHAIN_ID.OPTIMISM:
      return '0x52c04330c9d38638b5d38e685f13ca744b84155b' as Address
    case CHAIN_ID.BASE:
      return '0xdafeb89f713e25a02e4ec21a18e3757d7a76d19e' as Address
    case CHAIN_ID.ZORA:
      return '0xe0986c3bdab537fbeb7c94d0c5ef961d6d8bf63a' as Address
    case CHAIN_ID.SEPOLIA:
      return '0xcf933e48b5677e15b49ab69821bb7b7b8ad109bb' as Address
    case CHAIN_ID.OPTIMISM_SEPOLIA:
      return '0xd8e1f218021550fadda4b1e353578b80a1ce1a94' as Address
    case CHAIN_ID.BASE_SEPOLIA:
      return '0x189a535b05faf9ab537868589fa935705a1893a5' as Address
    case CHAIN_ID.ZORA_SEPOLIA:
      return '0xc99391cf03f85f81419f0771c543e80c5616e6bc' as Address
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

function createEscrowData(
  values: EscrowFormValues,
  treasuryAddress: Address,
  ipfsCID: string,
  chainId: string | number
) {
  const wrappedTokenAddress = getWrappedTokenAddress(chainId)
  const terminationTime = new Date(values.safetyValveDate).getTime() / 1000
  const ipfsBytesCid = convertIpfsCidV0ToByte32(ipfsCID)
  const factory = getEscrowFactory(chainId)

  // encode abi parameters to create escrowData
  const encodedParams = encodeAbiParameters(
    [
      'address',
      'uint8',
      'address',
      'address',
      'uint256',
      'bytes32',
      'address',
      'bool',
      'address',
      'address',
      'address',
    ].map(v => ({ type: v })),
    [
      values.clientAddress,
      ESCROW_RESOLVER_TYPE,
      SMART_INVOICE_ARBITRATION_PROVIDER,
      wrappedTokenAddress,
      terminationTime,
      ipfsBytesCid,
      wrappedTokenAddress,
      ESCROW_REQUIRE_VERIFICATION,
      factory,
      values.recipientAddress,
      treasuryAddress,
    ],
  );

  return encodedParams
}

const deployEscrowAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_provider',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '_milestoneAmounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: '_escrowData',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: '_escrowType',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_fundAmount',
        type: 'uint256',
      },
    ],
    name: 'deployEscrow',
    outputs: [
      {
        internalType: 'address',
        name: 'escrow',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
]

const initialState: EscrowFormValues = {
  clientAddress: '',
  recipientAddress: '',
  milestones: [
    {
      amount: 0.5,
      title: 'Milestone 1',
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
        .toISOString()
        .split('T')[0] as never,
      mediaUrl: '',
      mediaType: undefined,
      mediaFileName: '',
      description: 'About Milestone 1',
    },
  ],
  safetyValveDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    .toISOString()
    .split('T')[0],
}

const useEscrowFormStore = create(
  persist<EscrowFormState>(
    (set) => ({
      formValues: initialState,
      setFormValues: (values) => set({ formValues: values }),
      resetForm: () => set({ formValues: initialState }),
      clear: () => {
        set({ formValues: initialState })
        localStorage.removeItem('escrow-form-storage')
      },
    }),
    {
      name: 'escrow-form-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { createEscrowData, getEscrowBundler, deployEscrowAbi, useEscrowFormStore }
