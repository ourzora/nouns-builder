import { DataSource, Entity } from 'src/utils/pushWebhook'

export enum OP {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
}

export type WebHookBodyType<Old, New> = {
  op: OP
  data_source: DataSource
  data: {
    old: Old
    new: New
  }
  webhook_name: string
  webhook_id: string
  id: string
  delivery_info: {
    max_retries: number
    current_retry: number
  }
  entity: Entity
}

export type AuctionEntity = {
  highest_bid: string | null
  extended: boolean
  settled: boolean
  bid_count: number
  token: string
  start_time: string
  dao: string
  end_time: string
  id: string
  first_bid_time: string
  vid: string
  winning_bid: string | null
  block_range: string
}

export type ProposalEntity = {
  proposal_threshold: string
  time_created: string
  queued: boolean
  values: string[]
  vote_end: string
  executed: boolean
  proposer: string
  proposal_id: string
  executable_from: null | string
  vetoed: boolean
  transaction_hash: string
  vote_count: number
  for_votes: number
  vote_start: string
  canceled: boolean
  expires_at: null | string
  dao: string
  targets: any[]
  id: string
  quorum_votes: string
  proposal_number: number
  title: string
  vid: string
  against_votes: number
  description_hash: string
  snapshot_block_number: string
  abstain_votes: number
  description: string
  calldatas: string
  block_range: string
}

export type AuctionEvent = WebHookBodyType<null, AuctionEntity>
export type ProposalEvent = WebHookBodyType<null, ProposalEntity>
