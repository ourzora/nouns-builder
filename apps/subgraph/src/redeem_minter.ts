import { MinterSet as MinterSetEvent } from '../generated/RedeemMinter/RedeemMinter'
import { RedeemMint } from '../generated/schema'

export function handleMinterSet(event: MinterSetEvent): void {
  let mint = new RedeemMint(event.params.tokenContract.toHexString())
  mint.dao = event.params.tokenContract.toHexString()
  mint.mintStart = event.params.redeemSettings.mintStart
  mint.mintEnd = event.params.redeemSettings.mintEnd
  mint.pricePerToken = event.params.redeemSettings.pricePerToken
  mint.redeemToken = event.params.redeemSettings.redeemToken
  mint.save()
}
