import { fetchBalance } from '@wagmi/core'
import { Address, readContracts } from 'wagmi'

import { SDK } from 'src/data/subgraph/client'
import { getProposals } from 'src/data/subgraph/requests/proposalsQuery'
import { CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { metadataAbi, tokenAbi } from '../abis'

export type DaoOgMetadata = {
  ownerCount: number
  treasuryBalance: string
  proposalCount: number
  name: string | undefined
  totalSupply: string | undefined
  daoImage: string | undefined
}

const getOwnerCount = async (chainId: CHAIN_ID, token: string) => {
  return SDK.connect(chainId)
    .daoInfo({ tokenAddress: token })
    .then((x) => x.dao?.ownerCount || 0)
}

const getProposalCount = async (chainId: CHAIN_ID, token: string) => {
  return getProposals(chainId, token, 1).then((x) =>
    x.proposals && x.proposals.length > 0 ? x.proposals[0].proposalNumber : 0
  )
}

const getTreasuryBalance = async (chainId: CHAIN_ID, treasury: string) => {
  const balance = await fetchBalance({
    address: treasury as Address,
    chainId,
  })
  return formatCryptoVal(balance?.formatted)
}

const getContractMetadata = async (
  chainId: CHAIN_ID,
  token: string,
  metadata: string
) => {
  const tokenContractParams = {
    abi: tokenAbi,
    address: token as Address,
    chainId,
  }
  const metadataContractParams = {
    abi: metadataAbi,
    address: metadata as Address,
    chainId: chainId,
  }

  const contractData = await readContracts({
    contracts: [
      { ...tokenContractParams, functionName: 'name' },
      { ...tokenContractParams, functionName: 'totalSupply' },
      { ...metadataContractParams, functionName: 'contractImage' },
    ],
  })

  const [name, totalSupply, daoImage] = unpackOptionalArray(contractData, 5)

  return {
    name,
    totalSupply: totalSupply?.toString(),
    daoImage,
  }
}

const getDaoOgMetadata = async (
  chainId: CHAIN_ID,
  token: string,
  metadata: string,
  treasury: string
): Promise<DaoOgMetadata> => {
  const [contractMetadata, treasuryBalance, ownerCount, proposalCount] =
    await Promise.all([
      getContractMetadata(chainId, token, metadata),
      getTreasuryBalance(chainId, treasury),
      getOwnerCount(chainId, token),
      getProposalCount(chainId, token),
    ])

  return {
    ...contractMetadata,
    ownerCount,
    treasuryBalance,
    proposalCount,
  }
}

export default getDaoOgMetadata
