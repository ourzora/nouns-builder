import isUndefined from 'lodash/isUndefined'
import pickBy from 'lodash/pickBy'
import useSWR from 'swr'
import { encodeFunctionData } from 'viem'
import { useContractRead } from 'wagmi'

import { RENDERER_BASE } from 'src/constants/rendererBase'
import SWR_KEYS from 'src/constants/swrKeys'
import { metadataAbi } from 'src/data/contract/abis'
import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { getProposals } from 'src/data/subgraph/requests/proposalsQuery'
import {
  BuilderTransaction,
  Transaction,
  TransactionType,
} from 'src/modules/create-proposal'
import { DaoContractAddresses } from 'src/modules/dao'
import { AddressType, CHAIN_ID } from 'src/typings'

interface RendererBaseFix {
  shouldFix: boolean
  transaction?: BuilderTransaction
  description?: string
  activeProposalId?: string
}

interface RendererBaseFixProps {
  chainId: CHAIN_ID
  addresses: DaoContractAddresses
}

const findActiveProposal = (
  proposals: Proposal[],
  tx: Transaction
): Proposal | undefined => {
  const activeProposals = proposals?.filter(
    (proposal) =>
      proposal.state === ProposalState.Active ||
      proposal.state === ProposalState.Pending ||
      proposal.state === ProposalState.Queued ||
      proposal.state === ProposalState.Succeeded
  )

  const propInProgress = activeProposals.find((proposal) =>
    proposal.calldatas.includes(tx.calldata)
  )

  return propInProgress
}

export const useRendererBaseFix = ({
  chainId,
  addresses,
}: RendererBaseFixProps): RendererBaseFix => {
  const { metadata } = addresses
  const {
    data: rendererBase,
    isLoading,
    isError,
  } = useContractRead({
    abi: metadataAbi,
    address: metadata,
    chainId: chainId,
    functionName: 'rendererBase',
  })

  const { data: proposals } = useSWR(
    !!addresses?.token ? [SWR_KEYS.PROPOSALS_CALLDATAS, chainId, addresses?.token] : null,
    () => getProposals(chainId, addresses?.token as string, 100)
  )

  const hasUndefinedAddresses = Object.keys(pickBy(addresses, isUndefined)).length > 0
  if (!rendererBase || isLoading || hasUndefinedAddresses || isError || !proposals) {
    return {
      shouldFix: false,
      transaction: undefined,
      description: undefined,
      activeProposalId: undefined,
    }
  }

  const needsFix = rendererBase !== RENDERER_BASE

  const updateRendererBase: Transaction = {
    target: metadata as AddressType,
    functionSignature: 'updateRendererBase(string)',
    calldata: encodeFunctionData({
      abi: metadataAbi,
      functionName: 'updateRendererBase',
      args: [RENDERER_BASE],
    }),
    value: '',
  }

  const fixRendererBaseTransaction: BuilderTransaction = {
    type: TransactionType.FIX_RENDERER_BASE,
    summary: 'Fix Metadata Renderer Base',
    transactions: [updateRendererBase],
  }

  const activeProposal = findActiveProposal(proposals?.proposals, updateRendererBase)

  const noActiveProposal = isUndefined(activeProposal)

  return {
    shouldFix: noActiveProposal && needsFix,
    description: `This updates the metadata renderer to restore NFT image visibility on external marketplaces.`,
    activeProposalId: activeProposal?.proposalId,
    transaction: fixRendererBaseTransaction,
  }
}
