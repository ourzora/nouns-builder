import { DataSource } from 'src/utils/pushWebhook'

export enum OP {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
}

export enum Entity {
  Auction = 'auction',
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

export type AuctionEvent = WebHookBodyType<null, AuctionEntity>
