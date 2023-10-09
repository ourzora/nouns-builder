import { ethers } from 'ethers'
import { Address, Chain, encodeAbiParameters } from 'viem'
import { useContractReads } from 'wagmi'

import { MIGRATION_ADDRESSES } from 'src/constants/addresses'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
  treasuryAbi,
} from 'src/data/contract/abis'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

export function usePrepareMigrationDeploy(
  targetChain: Chain,
  zeroFounder: {
    wallet: `0x${string}`
    ownershipPct: bigint
    vestExpiry: bigint
  },
  merkleRoot: `0x${string}`
) {
  const { treasury, auction, token, metadata, governor } = useDaoStore((x) => x.addresses)
  const chain = useChainStore((x) => x.chain)
  const tokenContractParams = {
    abi: tokenAbi,
    address: token as Address,
    chainId: chain.id,
  }

  const metadataContractParams = {
    abi: metadataAbi,
    address: metadata as Address,
    chainId: chain.id,
  }

  const auctionContractParams = {
    abi: auctionAbi,
    address: auction as Address,
    chainId: chain.id,
  }

  const governorContractParams = {
    abi: governorAbi,
    address: governor as Address,
    chainId: chain.id,
  }

  const treasuryContractParams = {
    abi: treasuryAbi,
    address: treasury as Address,
    chainId: chain.id,
  }

  const { data: contractData } = useContractReads({
    allowFailure: false,
    contracts: [
      { ...tokenContractParams, functionName: 'name' },
      { ...tokenContractParams, functionName: 'symbol' },
      { ...tokenContractParams, functionName: 'getFounders' },
      { ...tokenContractParams, functionName: 'totalSupply' },
      { ...metadataContractParams, functionName: 'contractImage' },
      { ...metadataContractParams, functionName: 'description' },
      { ...metadataContractParams, functionName: 'contractURI' },
      { ...auctionContractParams, functionName: 'duration' },
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...governorContractParams, functionName: 'votingDelay' },
      { ...governorContractParams, functionName: 'votingPeriod' },
      { ...governorContractParams, functionName: 'proposalThresholdBps' },
      { ...governorContractParams, functionName: 'quorumThresholdBps' },
      { ...governorContractParams, functionName: 'vetoer' },
      { ...treasuryContractParams, functionName: 'delay' },
    ] as const,
  })

  const [
    name,
    symbol,
    existingFounders,
    totalSupply,
    daoImage,
    description,
    contractURI,
    duration,
    reservePrice,
    votingDelay,
    votingPeriod,
    proposalThresholdBps,
    quorumThresholdBps,
    vetoer,
    timelockDelay,
  ] = unpackOptionalArray(contractData, 13)

  const founderParams = existingFounders
    ? [
        zeroFounder,
        ...existingFounders.map((x) => ({
          wallet: x.wallet,
          ownershipPct: BigInt(x.ownershipPct),
          vestExpiry: BigInt(x.vestExpiry),
        })),
      ]
    : [zeroFounder]

  const abiCoder = new ethers.utils.AbiCoder()

  const merkleMinterSettingsHex = encodeAbiParameters(
    [
      { name: 'mintStart', type: 'uint64' },
      { name: 'mintEnd', type: 'uint64' },
      { name: 'pricePerToken', type: 'uint64' },
      { name: 'merkleRoot', type: 'bytes32' },
    ],
    [
      BigInt(0), // can it just be 0?
      18446744073709551615n, //  max
      BigInt(0),
      merkleRoot,
    ]
  )

  const initialMinter = MIGRATION_ADDRESSES[CHAIN_ID.BASE_GOERLI].MERKLERESERVEMINTER // figure it out based on chain going to
  const tokenParamsHex = encodeAbiParameters(
    [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'reservedUntilTokenId', type: 'uint256' },
      { name: 'initialMinter', type: 'address' },
      { name: 'initialMinterData', type: 'bytes' },
    ],
    [name!, symbol!, totalSupply!, initialMinter, merkleMinterSettingsHex]
  )

  const propertyMetadataParamsHex = abiCoder.encode(
    ['string', 'string', 'string', 'string'],
    [description, daoImage, contractURI, 'https://api.zora.co/renderer/stack-images']
  )

  const auctionParamsHex = abiCoder.encode(
    ['uint256', 'uint256', 'address', 'uint256'],
    [
      duration,
      reservePrice,
      '0x0000000000000000000000000000000000000000', // founderRewardRecipient
      0, // founderRewardBPS
    ]
  )

  const treasuryParamsHex = abiCoder.encode(['uint256'], [timelockDelay])

  const governorParamsHex = abiCoder.encode(
    ['uint256', 'uint256', 'uint256', 'uint256', 'address'],
    [votingDelay, votingPeriod, proposalThresholdBps, quorumThresholdBps, vetoer]
  )

  const { TOKEN, MEDIAMETADATARENDERER, AUCTION, TREASURY, GOVERNOR } =
    MIGRATION_ADDRESSES[CHAIN_ID.BASE_GOERLI]

  const implData = [
    tokenParamsHex,
    propertyMetadataParamsHex,
    auctionParamsHex,
    treasuryParamsHex,
    governorParamsHex,
  ]
  const implAddresses: Address[] = [
    TOKEN,
    MEDIAMETADATARENDERER,
    AUCTION,
    TREASURY,
    GOVERNOR,
  ]

  /// REQUIRED
  /// FounderParams[] calldata _founderParams,
  /// address[] calldata _implAddresses,
  /// bytes[] calldata _implData [token, metadata, auction, treasury, governor]

  return {
    _founderParams: founderParams,
    _implAddresses: implAddresses,
    _implData: implData,
  }
}
