import {
  Address,
  createPublicClient,
  encodeAbiParameters,
  http,
  parseAbiParameters,
} from 'viem'
import { readContracts } from 'wagmi'

import { L2_DEPLOYMENT_ADDRESSES, NULL_ADDRESS } from 'src/constants/addresses'
import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { RPC_URL } from 'src/constants/rpc'
import {
  auctionAbi,
  governorAbi,
  metadataAbi,
  tokenAbi,
  treasuryAbi,
} from 'src/data/contract/abis'
import { SDK } from 'src/data/subgraph/client'
import { DaoStoreProps } from 'src/modules/dao'
import { ChainStoreProps } from 'src/stores/useChainStore'
import { AddressType, CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

export async function prepareMigrationDeploy(
  targetChainId: CHAIN_ID,
  currentChain: ChainStoreProps,
  currentDao: DaoStoreProps,
  merkleRoot: `0x${string}`
) {
  const { treasury, auction, token, metadata, governor } = currentDao.addresses
  const chain = currentChain.chain
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
  const contractData = await readContracts({
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

  // L2 MESSAGE RELAYER 0x9f6793140ea606BCeB98761d9bEB1bc87383817e or 0x4200000000000000000000000000000000000007 ?
  const L2DAOAddressZeroFounder = {
    // L2 Message Relayer will
    wallet: '0x01e2d618d5752f99047ba611ad35d9f8a9cc85bf' as AddressType, // deployhelper
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

  /// GET SAMPLE METADATA, TO DECODE.
  /// NEED TO GET TXN HASH
  const sdkDATA = await SDK.connect(currentChain.chain.id).daoMetadataHashes({
    tokenAddress: `${token?.toLowerCase()}`,
  })
  const metadataUpdateHashes = sdkDATA.dao?.metadataUpdateHashes as Array<`0x${string}`>
  console.log('sdk data: ', metadataUpdateHashes)

  const client = createPublicClient({
    chain: PUBLIC_ALL_CHAINS.find((x) => x.id === currentChain.chain.id),
    transport: http(RPC_URL[currentChain.chain.id]),
  })

  const metadataTxn = await client.getTransaction({
    hash: metadataUpdateHashes[0],
  })

  const encodedMetadata = metadataTxn.input

  const merkleMinterSettingsHex = {
    mintStart: 0n,
    mintEnd: 18446744073709551615n,
    pricePerToken: 0n,
    merkleRoot: merkleRoot,
  }

  // TOKEN PARAMS
  const tokenInitStrings = encodeAbiParameters(
    parseAbiParameters(
      'string name, string symbol, string description, string daoImage, string daoWebsite, string baseRenderer'
    ),
    [
      name!,
      symbol!,
      description!,
      daoImage!,
      contractURI!,
      'https://api.zora.co/renderer/stack-images',
    ]
  )

  const tokenParams = {
    initStrings: tokenInitStrings as AddressType,
    reservedUntilTokenId: totalSupply!,
    metadataRenderer: NULL_ADDRESS,
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

  const { TOKEN, MEDIA_METADATA_RENDERER, AUCTION, TREASURY, GOVERNOR } =
    L2_DEPLOYMENT_ADDRESSES[targetChainId]

  const implData = {
    token: tokenParams,
    founder: founderParams,
    auction: auctionParams,
    gov: govParams,
  }

  const implAddresses: Address[] = [
    TOKEN,
    MEDIA_METADATA_RENDERER,
    AUCTION,
    TREASURY,
    GOVERNOR,
  ]

  /// REQUIRED
  /// FounderParams[] calldata _founderParams,
  /// address[] calldata _implAddresses,
  /// bytes[] calldata _implData [token, metadata, auction, treasury, governor]

  return {
    founderParams,
    implAddresses,
    implData,
    encodedMetadata,
    merkleMinterSettingsHex,
  }
}
