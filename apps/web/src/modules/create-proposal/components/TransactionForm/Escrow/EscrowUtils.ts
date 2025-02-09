import { decode, encode } from 'bs58'
import { Address, encodeAbiParameters, Hex, toBytes, toHex } from 'viem'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { CHAIN_ID } from 'src/typings'

import { EscrowFormState, EscrowFormValues } from './EscrowForm.schema'

const SMART_INVOICE_ARBITRATION_PROVIDER =
  '0x18542245cA523DFF96AF766047fE9423E0BED3C0' as Address
const ESCROW_RESOLVER_TYPE = 0
const ESCROW_REQUIRE_VERIFICATION = true
const ESCROW_TYPE = toHex(toBytes('updatable', { size: 32 }))

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

function getEscrowBundler(chainId: number | string): Address {
  chainId = Number(chainId)
  switch (chainId) {
    case CHAIN_ID.ETHEREUM:
      return '0xb4cdef4aa610c046864467592fae456a58d3443a' as Address
    case CHAIN_ID.OPTIMISM:
      return '0xdafeb89f713e25a02e4ec21a18e3757d7a76d19e' as Address
    case CHAIN_ID.BASE:
      return '0xf4640751e7363a0572d4ba93a9b049b956b33c17' as Address
    case CHAIN_ID.ZORA:
      return '0x0325e1b676c4cf59e0b690a05e0181be862193d4' as Address
    case CHAIN_ID.SEPOLIA:
      return '0x9c1E057B37605B7f6ed6f4c8E2826C3d84ddC08D' as Address
    case CHAIN_ID.OPTIMISM_SEPOLIA:
      return '0xe0986c3bdab537fbeb7c94d0c5ef961d6d8bf63a' as Address
    case CHAIN_ID.BASE_SEPOLIA:
      return '0x3add1d027116a5406ced10411945cf2d4d9ed68e' as Address
    case CHAIN_ID.ZORA_SEPOLIA:
      return '0x851e59a39571e599954702f0e4996bf838d9c863' as Address
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

function createEscrowData(
  values: EscrowFormValues,
  ipfsCID: string,
  chainId: string | number
) {
  const warappedTokenAddress = getWrappedTokenAddress(chainId)
  const terminationTime = new Date(values.safetyValveDate).getTime() / 1000
  const ipfsBytesCid = convertIpfsCidV0ToByte32(ipfsCID)

  // encode abi parameters to create escrowData
  const encodedParams = encodeAbiParameters(
    [
      'address',
      'address',
      'uint8',
      'address',
      'uint256',
      'bytes32',
      'address',
      'address',
      'bool',
      'bytes32',
    ].map((type) => ({ type })),
    [
      values.clientAddress,
      SMART_INVOICE_ARBITRATION_PROVIDER,
      ESCROW_RESOLVER_TYPE,
      warappedTokenAddress,
      terminationTime,
      ipfsBytesCid,
      values.recipientAddress,
      values.recipientAddress,
      ESCROW_REQUIRE_VERIFICATION,
      ESCROW_TYPE,
    ]
  )

  return encodedParams
}

const deployEscrowAbi = [
  {
    name: 'deployEscrow',
    type: 'function',
    inputs: [
      {
        name: '_milestoneAmounts',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_escrowData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: '_fundAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'escrow',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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

export {
  createEscrowData,
  getEscrowBundler,
  deployEscrowAbi,
  useEscrowFormStore,
}
