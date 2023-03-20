import { fetchBalance } from '@wagmi/core'
import { Address, readContracts } from 'wagmi'

import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'
import { getProposals } from 'src/data/graphql/requests/proposalsQuery'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { metadataAbi, tokenAbi } from '../abis'

const getOwnerCount = async (token: string) => {
  return sdk
    .daoInfo({ collectionAddress: token, chain: CHAIN })
    .then((x) => x.aggregateStat?.ownerCount || 0)
}

const getProposalCount = async (token: string) => {
  return getProposals([token], 1).then((x) =>
    x.proposals ? x.proposals[0].proposalNumber : 0
  )
}

const getTreasuryBalance = async (treasury: string) => {
  const balance = await fetchBalance({
    address: treasury as Address,
  })

  return balance?.formatted ? formatCryptoVal(balance?.formatted) : 0
}

const getContractMetadata = async (token: string, metadata: string) => {
  const tokenContractParams = {
    abi: tokenAbi,
    address: token as Address,
  }
  const metadataContractParams = {
    abi: metadataAbi,
    address: metadata as Address,
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
    totalSupply,
    daoImage,
  }
}

const getDaoOgMetadata = async (token: string, metadata: string) => {
  const [contractMetadata, treasuryBalance, ownerCount, proposalCount] =
    await Promise.all([
      getContractMetadata(token, metadata),
      getTreasuryBalance(token),
      getOwnerCount(token),
      getProposalCount(token),
    ])

  return {
    ...contractMetadata,
    ownerCount,
    treasuryBalance,
    proposalCount,
  }
}

export default getDaoOgMetadata
