import { encodeAbiParameters, parseAbiParameters } from 'viem'
import { readContracts } from 'wagmi'

import { NULL_ADDRESS } from 'src/constants/addresses'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
  treasuryAbi,
} from 'src/data/contract/abis'
import { DaoContractAddresses } from 'src/modules/dao'
import { AddressType, BytesType, CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

export async function prepareMigrationDeploy(
  chainId: CHAIN_ID,
  addresses: DaoContractAddresses,
  deployer: AddressType,
  metadata: AddressType,
  merkleRoot: BytesType
) {
  const contracts = setupContracts({
    addresses: addresses as Required<DaoContractAddresses>,
    chainId,
  })
  const contractData = await fetchContractData({ contracts })
  return transformContractData({
    contractData,
    merkleRoot,
    metadata,
    deployer,
  })
}

const transformContractData = ({
  contractData,
  metadata,
  merkleRoot,
  deployer,
}: {
  contractData: Awaited<ReturnType<typeof fetchContractData>>
  metadata: AddressType
  merkleRoot: BytesType
  deployer: AddressType
}) => {
  const [
    name,
    symbol,
    existingFounders,
    daoImage,
    description,
    projectURI,
    duration,
    reservePrice,
    auction,
    votingDelay,
    votingPeriod,
    proposalThresholdBps,
    quorumThresholdBps,
    vetoer,
    timelockDelay,
  ] = unpackOptionalArray(contractData, 15)

  const [tokenId] = unpackOptionalArray(auction, 6)

  const L2DAOAddressZeroFounder = {
    wallet: deployer,
    ownershipPct: 0n,
    vestExpiry: BigInt(Math.floor(new Date('2040-01-01').getTime() / 1000)),
  }

  const founderParams = existingFounders
    ? [
        L2DAOAddressZeroFounder,
        ...existingFounders.map((x) => ({
          wallet: x.wallet,
          ownershipPct: BigInt(x.ownershipPct),
          vestExpiry: BigInt(x.vestExpiry),
        })),
      ]
    : [L2DAOAddressZeroFounder]

  const minterParams = {
    mintStart: 0n,
    mintEnd: 18446744073709551615n,
    pricePerToken: 0n,
    merkleRoot: merkleRoot,
  }

  const tokenInitStrings = encodeAbiParameters(
    parseAbiParameters(
      'string name, string symbol, string description, string daoImage, string daoWebsite, string baseRenderer'
    ),
    [
      name!,
      symbol!,
      description!,
      daoImage!,
      projectURI!,
      'https://api.zora.co/renderer/stack-images',
    ]
  )

  const tokenParams = {
    initStrings: tokenInitStrings as AddressType,
    reservedUntilTokenId: tokenId! + 1n,
    metadataRenderer: metadata,
  }

  const auctionParams = {
    reservePrice: reservePrice!,
    duration: BigInt(duration!),
    founderRewardRecipent: NULL_ADDRESS,
    founderRewardBps: 0,
  }

  const govParams = {
    timelockDelay: timelockDelay!,
    votingDelay: votingDelay!,
    votingPeriod: votingPeriod!,
    proposalThresholdBps: proposalThresholdBps!,
    quorumThresholdBps: quorumThresholdBps!,
    vetoer: vetoer!,
  }

  return {
    token: tokenParams,
    founder: founderParams,
    auction: auctionParams,
    gov: govParams,
    minter: minterParams,
  }
}

const fetchContractData = async ({
  contracts,
}: {
  contracts: ReturnType<typeof setupContracts>
}) => {
  return await readContracts({
    allowFailure: false,
    contracts: [
      { ...contracts.token, functionName: 'name' },
      { ...contracts.token, functionName: 'symbol' },
      { ...contracts.token, functionName: 'getFounders' },
      { ...contracts.metadata, functionName: 'contractImage' },
      { ...contracts.metadata, functionName: 'description' },
      { ...contracts.metadata, functionName: 'projectURI' },
      { ...contracts.auction, functionName: 'duration' },
      { ...contracts.auction, functionName: 'reservePrice' },
      { ...contracts.auction, functionName: 'auction' },
      { ...contracts.governor, functionName: 'votingDelay' },
      { ...contracts.governor, functionName: 'votingPeriod' },
      { ...contracts.governor, functionName: 'proposalThresholdBps' },
      { ...contracts.governor, functionName: 'quorumThresholdBps' },
      { ...contracts.governor, functionName: 'vetoer' },
      { ...contracts.treasury, functionName: 'delay' },
    ] as const,
  })
}

const setupContracts = ({
  addresses,
  chainId,
}: {
  addresses: Required<DaoContractAddresses>
  chainId: CHAIN_ID
}) => {
  const token = {
    abi: tokenAbi,
    address: addresses.token,
    chainId,
  }
  const metadata = {
    abi: metadataAbi,
    address: addresses.metadata,
    chainId,
  }
  const auction = {
    abi: auctionAbi,
    address: addresses.auction,
    chainId,
  }
  const governor = {
    abi: governorAbi,
    address: addresses.governor,
    chainId,
  }
  const treasury = {
    abi: treasuryAbi,
    address: addresses.treasury,
    chainId,
  }

  return {
    token,
    metadata,
    auction,
    governor,
    treasury,
  }
}
