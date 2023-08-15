import * as Sentry from '@sentry/nextjs'

import {
  ProposalState,
  getProposalState,
} from 'src/data/contract/requests/getProposalState'
import { SDK } from 'src/data/subgraph/client'
import {
  ProposalFragment,
  ProposalOgMetadataQuery,
  ProposalQuery,
  ProposalVoteFragment as ProposalVote,
} from 'src/data/subgraph/sdk.generated'
import { CHAIN_ID } from 'src/typings'

export interface Proposal
  extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt' | 'calldatas'> {
  calldatas: string[]
  state: ProposalState
  executableFrom?: number
  expiresAt?: number
  votes?: ProposalVote[]
}

export type ProposalQueryLike = ProposalQuery | ProposalOgMetadataQuery

export const formatAndFetchState = async (chainId: CHAIN_ID, data: ProposalQueryLike) => {
  if (!data?.proposal) {
    return undefined
  }

  const { executableFrom, expiresAt, calldatas, ...proposal } = data?.proposal

  const baseProposal = {
    ...proposal,
    calldatas: calldatas ? calldatas.split(':') : [],
    state: await getProposalState(
      chainId,
      proposal.dao.governorAddress,
      proposal.proposalId
    ),
  }

  // executableFrom and expiresAt will always either be both defined, or neither defined
  if (executableFrom && expiresAt) {
    return {
      ...baseProposal,
      executableFrom,
      expiresAt,
    }
  }
  return baseProposal
}

export const getProposal = async (
  chainId: CHAIN_ID,
  proposalId: string
): Promise<Proposal | undefined> => {
  try {
    const data = await SDK.connect(chainId).proposal({
      proposalId,
    })

    return await formatAndFetchState(chainId, data)
  } catch (e) {
    console.log('err', e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return
  }
}
