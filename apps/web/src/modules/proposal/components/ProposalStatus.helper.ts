import { theme } from '@zoralabs/zord'

import { NounsProposalStatus } from 'src/data/graphql/sdk.generated'
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

export function parseState(state: NounsProposalStatus) {
  switch (state) {
    case NounsProposalStatus.Created:
    case NounsProposalStatus.Pending:
      return 'Pending'
    case NounsProposalStatus.Active:
      return 'Active'
    case NounsProposalStatus.Canceled:
      return 'Cancelled'
    case NounsProposalStatus.Defeated:
      return 'Defeated'
    case NounsProposalStatus.Succeeded:
      return 'Succeeded'
    case NounsProposalStatus.Queued:
    case NounsProposalStatus.Executable:
      return 'Queued'
    case NounsProposalStatus.Expired:
      return 'Expired'
    case NounsProposalStatus.Executed:
      return 'Executed'
    case NounsProposalStatus.Vetoed:
      return 'Vetoed'
    default:
      return 'Loading'
  }
}

export function parseBgColor(state: NounsProposalStatus) {
  switch (state) {
    case NounsProposalStatus.Created:
    case NounsProposalStatus.Pending:
    case NounsProposalStatus.Active:
    case NounsProposalStatus.Succeeded:
      return {
        borderColor: 'rgba(28, 182, 135, 0.1)',
        color: theme.colors.positive,
      }
    case NounsProposalStatus.Defeated:
      return {
        borderColor: 'rgba(240, 50, 50, 0.1)',
        color: theme.colors.negative,
      }
    case NounsProposalStatus.Executed:
      return {
        borderColor: 'rgba(37, 124, 237, 0.1)',
        color: '#257CED',
      }
    case NounsProposalStatus.Queued:
    case NounsProposalStatus.Executable:
      return {
        borderColor: '#F2E2F7',
        color: '#D16BE1',
      }
    case NounsProposalStatus.Expired:
    default:
      return { borderColor: theme.colors.background2, color: theme.colors.text4 }
  }
}
