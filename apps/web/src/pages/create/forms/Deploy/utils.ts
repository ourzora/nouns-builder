import { allocationProps, AuctionDuration } from 'src/typings'

export const formatAuctionDuration = (duration: AuctionDuration): string => {
  const days = `${duration.days || '0'} ${Number(duration.days) === 1 ? 'day' : 'days'}`
  const hours = `${duration.hours || '0'} ${
    Number(duration.hours) === 1 ? 'hour' : 'hours'
  }`
  const minutes = `${duration.minutes || '0'} ${
    Number(duration.minutes) === 1 ? 'minute' : 'minutes'
  }`

  return `${days}, ${hours} & ${minutes}`
}

export const formatFounderAllocation = (allocation: allocationProps): string => {
  const totalAllocation = allocation.maxAllocation
    ? ', for a total of ${allocation.maxAllocation} Tokens'
    : ''

  return `${allocation.founderAddress} will receive ${allocation.allocation}% of Tokens, until ${allocation.endDate}${totalAllocation}.`
}
