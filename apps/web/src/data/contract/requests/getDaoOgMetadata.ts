import { fetchBalance } from '@wagmi/core'
import { Address, readContracts } from 'wagmi'

import { SDK } from 'src/data/subgraph/client'
import { getProposals } from 'src/data/subgraph/requests/proposalsQuery'
import { Chain } from 'src/typings'
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

const getOwnerCount = async (chain: Chain, token: string) => {
  return SDK.connect(chain.id)
    .daoInfo({ tokenAddress: token })
    .then((x) => x.dao?.ownerCount || 0)
}

const getProposalCount = async (chain: Chain, token: string) => {
  return getProposals(chain, token, 1).then((x) =>
    x.proposals && x.proposals.length > 0 ? x.proposals[0].proposalNumber : 0
  )
}

const getTreasuryBalance = async (chain: Chain, treasury: string) => {
  const balance = await fetchBalance({
    address: treasury as Address,
    chainId: chain.id,
  })
  return formatCryptoVal(balance?.formatted)
}

const getContractMetadata = async (chain: Chain, token: string, metadata: string) => {
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
  chain: Chain,
  token: string,
  metadata: string,
  treasury: string
): Promise<DaoOgMetadata> => {
  const [contractMetadata, treasuryBalance, ownerCount, proposalCount] =
    await Promise.all([
      getContractMetadata(chain, token, metadata),
      getTreasuryBalance(chain, treasury),
      getOwnerCount(chain, token),
      getProposalCount(chain, token),
    ])

  return {
    ...contractMetadata,
    ownerCount,
    treasuryBalance,
    proposalCount,
  }
}

export default getDaoOgMetadata
