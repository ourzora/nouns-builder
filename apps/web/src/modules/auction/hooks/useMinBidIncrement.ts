import { BigNumber, ethers } from 'ethers'

const DEFAULT_MIN_BID_AMOUNT = 0.0001

export const useMinBidIncrement = ({
  highestBid,
  reservePrice,
  minBidIncrement,
}: {
  highestBid?: BigNumber
  reservePrice?: BigNumber
  minBidIncrement?: BigNumber
}) => {
  if (
    !reservePrice ||
    !minBidIncrement ||
    // force default min bid amount given reserve price of 0 and no current bids
    (BigNumber.from(reservePrice).isZero() && BigNumber.from(highestBid).isZero())
  ) {
    return {
      minBidAmount: DEFAULT_MIN_BID_AMOUNT,
    }
  }

  if (!highestBid || BigNumber.from(highestBid).isZero()) {
    return {
      minBidAmount: Number(ethers.utils.formatEther(reservePrice)),
    }
  }

  const currBid = BigNumber.from(highestBid)
  const minBidRawAmount = currBid.mul(minBidIncrement).div(100).add(currBid)
  const minBidFormattedAmount = Number(ethers.utils.formatEther(minBidRawAmount))

  return {
    minBidAmount: minBidFormattedAmount,
  }
}
