import * as Sentry from '@sentry/nextjs'
import { Proposal } from 'src/typings'

import { sdk } from 'src/data/graphql/client'

import { CHAIN } from 'src/constants/network'

import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

export interface ProposalsResponse {
  proposals: Proposal[]
  pageInfo?: {
    endCursor?: string | null
    hasNextPage: boolean
    limit: number
  }
}

export const getProposals = async (
  token: [string],
  limit: number = 100,
  page?: number
): Promise<ProposalsResponse> => {
  try {
    const data = await sdk.proposals({
      token,
      chain: CHAIN,
      pagination: {
        limit,
        after: !!page ? encodePageNumToEndCursor(limit, page.toString()) : undefined,
      },
    })

    return {
      proposals: data?.nouns?.nounsProposals?.nodes.map((p) => {
        const { executableFrom, expiresAt, ...proposal } = p

        // executableFrom and expiresAt will always either be both defined, or neither defined
        if (executableFrom && expiresAt) {
          return {
            ...proposal,
            executableFrom,
            expiresAt,
          }
        }
        return proposal
      }),
      pageInfo: data?.nouns?.nounsProposals?.pageInfo,
    }
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return {
      proposals: [],
    }
  }
}
