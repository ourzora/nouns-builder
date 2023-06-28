import * as Sentry from '@sentry/nextjs'

import {
  ProposalState,
  getProposalState,
} from 'src/data/contract/requests/getProposalState'
import { SDK } from 'src/data/subgraph/client'
import {
  ProposalFragment,
  ProposalVoteFragment as ProposalVote,
} from 'src/data/subgraph/sdk.generated'
import { BytesType, Chain } from 'src/typings'

export interface Proposal
  extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt' | 'calldatas'> {
  calldatas: string[]
  state: ProposalState
  executableFrom?: number
  expiresAt?: number
  votes?: ProposalVote[]
}

export const getProposal = async (
  chain: Chain,
  proposalId: string
): Promise<Proposal | undefined> => {
  try {
    const data = await SDK.connect(chain.id).proposal({
      proposalId,
    })

    if (!data?.proposal) {
      return undefined
    }

    const { executableFrom, expiresAt, calldatas, ...proposal } = data?.proposal

    const baseProposal = {
      ...proposal,
      calldatas: calldatas ? calldatas.split(':') : [],
      state: await getProposalState(
        chain,
        proposal.dao.governorAddress,
        proposalId as BytesType
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
  } catch (e) {
    console.log('err', e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return
  }
}
