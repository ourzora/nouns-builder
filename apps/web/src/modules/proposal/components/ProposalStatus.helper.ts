import { theme } from '@zoralabs/zord'

import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { fromSeconds } from 'src/utils/helpers'

export function parseTime(timediff: number, prefix: string) {
  const timeObj = fromSeconds(timediff)

  if (timeObj.days && timeObj.days > 0) {
    return timeObj.days > 1
      ? `${prefix} in ${timeObj.days} days`
      : `${prefix} in ${timeObj.days} day`
  }

  if (timeObj.hours && timeObj.hours > 0) {
    return timeObj.hours > 1
      ? `${prefix} in ${timeObj.hours} hours`
      : `${prefix} in ${timeObj.hours} hour`
  }

  if (timeObj.minutes && timeObj.minutes > 0) {
    return timeObj.minutes > 1
      ? `${prefix} in ${timeObj.minutes} minutes`
      : `${prefix} in ${timeObj.minutes} minute`
  }

  if (timeObj.seconds && timeObj.seconds > 0) {
    return timeObj.seconds > 1
      ? `${prefix} in ${timeObj.seconds} seconds`
      : `${prefix} in ${timeObj.seconds} second`
  }
}

export function parseState(state: ProposalState) {
  switch (state) {
    case ProposalState.Pending:
      return 'Pending'
    case ProposalState.Active:
      return 'Active'
    case ProposalState.Canceled:
      return 'Cancelled'
    case ProposalState.Defeated:
      return 'Defeated'
    case ProposalState.Succeeded:
      return 'Succeeded'
    case ProposalState.Queued:
      return 'Queued'
    case ProposalState.Expired:
      return 'Expired'
    case ProposalState.Executed:
      return 'Executed'
    case ProposalState.Vetoed:
      return 'Vetoed'
    default:
      return 'Loading'
  }
}

export function parseBgColor(state: ProposalState) {
  switch (state) {
    case ProposalState.Pending:
    case ProposalState.Active:
    case ProposalState.Succeeded:
      return {
        borderColor: 'rgba(28, 182, 135, 0.1)',
        color: theme.colors.positive,
      }
    case ProposalState.Defeated:
      return {
        borderColor: 'rgba(240, 50, 50, 0.1)',
        color: theme.colors.negative,
      }
    case ProposalState.Executed:
      return {
        borderColor: 'rgba(37, 124, 237, 0.1)',
        color: '#257CED',
      }
    case ProposalState.Queued:
      return {
        borderColor: '#F2E2F7',
        color: '#D16BE1',
      }
    case ProposalState.Expired:
    default:
      return { borderColor: theme.colors.background2, color: theme.colors.text4 }
  }
}
