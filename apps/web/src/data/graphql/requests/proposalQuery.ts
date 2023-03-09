import * as Sentry from '@sentry/nextjs'

import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'
import {
  ProposalFragment,
  ProposalVoteFragment as ProposalVote,
} from 'src/data/graphql/sdk.generated'

export interface Proposal extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt'> {
  executableFrom?: number
  expiresAt?: number
  transactionInfo: {
    blockNumber: number
    transactionHash?: string | null
  }
  votes?: ProposalVote[]
}

export const getProposal = async (proposalId: string): Promise<Proposal | undefined> => {
  try {
    const data = await sdk.proposal({
      proposalId,
      chain: CHAIN,
    })

    if (!data?.nouns.nounsProposal) {
      return undefined
    }

    const { executableFrom, expiresAt, ...proposal } = data?.nouns?.nounsProposal

    // executableFrom and expiresAt will always either be both defined, or neither defined
    if (executableFrom && expiresAt) {
      return {
        ...proposal,
        executableFrom,
        expiresAt,
      }
    }
    return proposal
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return
  }
}
