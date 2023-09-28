import { MinterSet as MinterSetEvent } from '../generated//MerkleMinter/MerkleMinter'
import { MerkleMint } from '../generated/schema'

export function handleMinterSet(event: MinterSetEvent): void {
  let mint = new MerkleMint(event.params.tokenContract.toHexString())
  mint.dao = event.params.tokenContract.toHexString()
  mint.mintStart = event.params.merkleSaleSettings.mintStart
  mint.mintEnd = event.params.merkleSaleSettings.mintEnd
  mint.pricePerToken = event.params.merkleSaleSettings.pricePerToken
  mint.merkleRoot = event.params.merkleSaleSettings.merkleRoot
}
