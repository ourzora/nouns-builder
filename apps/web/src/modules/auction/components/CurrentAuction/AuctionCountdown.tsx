import { AuctionDetail } from '../AuctionDetail'
import { Countdown } from 'src/components/Countdown'

export const AuctionCountdown = ({
  endTime,
  onEnd,
}: {
  endTime: number
  onEnd: () => void
}) => {
  return (
    <AuctionDetail title="Auction ends in">
      <Countdown end={endTime} onEnd={onEnd} />
    </AuctionDetail>
  )
}
