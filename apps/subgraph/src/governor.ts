import {
  ProposalCanceled as ProposalCanceledEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ProposalQueued as ProposalQueuedEvent,
  ProposalVetoed as ProposalVetoedEvent,
  VoteCast as VoteCastEvent,
} from '../generated/Governor/Governor'
import { DAO, Proposal, ProposalVote } from '../generated/schema'
import { BigInt, dataSource, log } from '@graphprotocol/graph-ts'

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let proposal = new Proposal(event.params.proposalId.toHexString())
  let context = dataSource.context()
  let dao = DAO.load(context.getString('tokenAddress'))!

  let newProposalCount = dao.proposalCount + 1

  proposal.proposalId = event.params.proposalId
  proposal.proposalNumber = newProposalCount

  proposal.targets = []
  for (let i = 0; i < event.params.targets.length; i++) {
    proposal.targets.push(event.params.targets[i])
  }

  proposal.values = event.params.values
  //proposal.calldatas = event.params.calldatas
  proposal.description = event.params.description
  proposal.proposer = event.params.proposal.proposer
  proposal.timeCreated = event.params.proposal.timeCreated
  proposal.againstVotes = event.params.proposal.againstVotes
  proposal.forVotes = event.params.proposal.forVotes
  proposal.abstainVotes = event.params.proposal.abstainVotes
  proposal.voteStart = event.params.proposal.voteStart
  proposal.voteEnd = event.params.proposal.voteEnd
  proposal.proposalThreshold = event.params.proposal.proposalThreshold
  proposal.quorumVotes = event.params.proposal.quorumVotes
  proposal.executed = event.params.proposal.executed
  proposal.canceled = event.params.proposal.canceled
  proposal.vetoed = event.params.proposal.vetoed
  proposal.queued = false
  proposal.dao = context.getString('tokenAddress')

  proposal.save()

  dao.proposalCount = newProposalCount
  dao.save()
}

export function handleProposalQueued(event: ProposalQueuedEvent): void {
  let proposal = new Proposal(event.params.proposalId.toHexString())
  proposal.queued = true
  proposal.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let proposal = new Proposal(event.params.proposalId.toHexString())
  proposal.executed = true
  proposal.queued = false
  proposal.save()
}

export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  let proposal = new Proposal(event.params.proposalId.toHexString())
  proposal.canceled = true
  proposal.queued = false
  proposal.save()
}

export function handleProposalVetoed(event: ProposalVetoedEvent): void {
  let proposal = new Proposal(event.params.proposalId.toHexString())
  proposal.vetoed = true
  proposal.queued = false
  proposal.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let proposalId = event.params.proposalId.toHexString()
  let proposal = Proposal.load(proposalId)!
  let proposalVote = new ProposalVote(
    `${event.transaction.hash.toHexString()}:${event.logIndex.toString()}`
  )

  proposalVote.voter = event.params.voter
  proposalVote.weight = event.params.weight
  proposalVote.reason = event.params.reason.length > 0 ? event.params.reason : null
  proposalVote.proposal = proposalId

  let support = event.params.support
  // If the vote is against:
  if (support.equals(BigInt.fromI32(0))) {
    proposal.againstVotes = proposal.againstVotes.plus(event.params.weight)
    proposalVote.support = 'AGAINST'
    // Else if the vote is for:
  } else if (support.equals(BigInt.fromI32(1))) {
    proposal.forVotes = proposal.forVotes.plus(event.params.weight)
    proposalVote.support = 'FOR'
    // Else if the vote is to abstain:
  } else if (support.equals(BigInt.fromI32(2))) {
    proposal.abstainVotes = proposal.abstainVotes.plus(event.params.weight)
    proposalVote.support = 'ABSTAIN'
  } else {
    log.error('Unknown vote support type: {}', [support.toString()])
  }

  proposal.save()
  proposalVote.save()
}
