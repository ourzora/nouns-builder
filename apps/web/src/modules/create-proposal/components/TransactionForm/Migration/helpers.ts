import { encodeFunctionData } from 'viem'
import { prepareWriteContract } from 'wagmi/actions'

import { auctionAbi } from 'src/data/contract/abis'
import { messengerABI } from 'src/data/contract/abis/L1CrossDomainMessenger'

const encodedMetadata = '0x0' // get from addProperties gql stuff
const L1_MESSENGER = '0x0' // depends on chain
// L2 MESSAGE RELAYER 0x9f6793140ea606BCeB98761d9bEB1bc87383817e or 0x4200000000000000000000000000000000000007 ?
const L2DaoMetadataAddress = '0x8EE9bb2c436500eD6465F212fcBb3F69Ca3d093B' // depends on DAO
export const addTraitsConfig = await prepareWriteContract({
  abi: messengerABI,
  address: L1_MESSENGER,
  functionName: 'sendMessage',
  args: [L2DaoMetadataAddress, encodedMetadata, 6000000],
  value: 0n,
})

export const unpauseConfig = await prepareWriteContract({
  abi: messengerABI,
  address: L1_MESSENGER,
  functionName: 'sendMessage',
  args: [
    '0x42302fb7B545540Ec3f4cbDCB10838B908d70F8c',
    encodeFunctionData({
      abi: auctionAbi,
      functionName: 'unpause',
    }),
    1000000,
  ],
  value: 0n,
})
