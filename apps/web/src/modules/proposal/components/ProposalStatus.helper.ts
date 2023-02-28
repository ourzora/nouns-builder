import { theme } from '@zoralabs/zord'

import { ProposalStatus } from 'src/typings'
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

export function parseState(state: ProposalStatus) {
  switch (state) {
    case ProposalStatus.Created:
    case ProposalStatus.Pending:
      return 'Pending'
    case ProposalStatus.Active:
      return 'Active'
    case ProposalStatus.Canceled:
      return 'Cancelled'
    case ProposalStatus.Defeated:
      return 'Defeated'
    case ProposalStatus.Succeeded:
      return 'Succeeded'
    case ProposalStatus.Queued:
    case ProposalStatus.Executable:
      return 'Queued'
    case ProposalStatus.Expired:
      return 'Expired'
    case ProposalStatus.Executed:
      return 'Executed'
    case ProposalStatus.Vetoed:
      return 'Vetoed'
    default:
      return 'Loading'
  }
}

export function parseBgColor(state: ProposalStatus) {
  switch (state) {
    case ProposalStatus.Created:
    case ProposalStatus.Pending:
    case ProposalStatus.Active:
    case ProposalStatus.Succeeded:
      return {
        borderColor: 'rgba(28, 182, 135, 0.1)',
        color: theme.colors.positive,
      }
    case ProposalStatus.Defeated:
      return {
        borderColor: 'rgba(240, 50, 50, 0.1)',
        color: theme.colors.negative,
      }
    case ProposalStatus.Executed:
      return {
        borderColor: 'rgba(37, 124, 237, 0.1)',
        color: '#257CED',
      }
    case ProposalStatus.Queued:
    case ProposalStatus.Executable:
      return {
        borderColor: '#F2E2F7',
        color: '#D16BE1',
      }
    case ProposalStatus.Expired:
    default:
      return { borderColor: theme.colors.background2, color: theme.colors.text4 }
  }
}
