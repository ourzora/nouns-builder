import { Contract } from 'ethers'
import intersection from 'lodash/intersection'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import lt from 'lodash/lt'
import pickBy from 'lodash/pickBy'
import useSWR from 'swr'
import { useContract, useContractReads } from 'wagmi'

import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi, managerAbi } from 'src/data/contract/abis'
import { ProposalState } from 'src/data/contract/requests/getProposalState'
import { Proposal } from 'src/data/subgraph/requests/proposalQuery'
import { getProposals } from 'src/data/subgraph/requests/proposalsQuery'
import {
  BuilderTransaction,
  CONTRACT_VERSION_DETAILS,
  Transaction,
  TransactionType,
  VersionType,
} from 'src/modules/create-proposal'
import { DaoContractAddresses } from 'src/modules/dao'
import { AddressType } from 'src/typings'

interface AvailableUpgrade {
  shouldUpgrade: boolean
  transaction?: BuilderTransaction
  currentVersions?: DaoVersions
  latest?: string
  date?: string
  description?: string
  activeUpgradeProposalId?: string
  totalContractUpgrades?: number
}

const contracts = ['governor', 'treasury', 'token', 'auction', 'metadata'] as const
type ContractType = typeof contracts[number]
type DaoVersions = Record<ContractType, string>

export const useAvailableUpgrade = (
  addresses: DaoContractAddresses,
  contractVersion?: VersionType
): AvailableUpgrade => {
  const contract = {
    abi: managerAbi,
    address: PUBLIC_MANAGER_ADDRESS as AddressType,
  }

  const auctionContract = useContract({ abi: auctionAbi, address: addresses?.auction })

  const managerContract = useContract(contract)

  const { data: proposals } = useSWR(
    !!addresses?.token ? [SWR_KEYS.PROPOSALS_CALLDATAS, addresses?.token] : null,
    () => getProposals(addresses?.token as string, 100)
  )

  const { data, isLoading, isError } = useContractReads({
    enabled: !!addresses?.token,
    contracts: [
      {
        abi: auctionAbi,
        address: addresses.auction as AddressType,
        functionName: 'paused',
      },
      {
        ...contract,
        functionName: 'contractVersion',
      },

      {
        ...contract,
        functionName: 'getDAOVersions',
        args: [addresses?.token as AddressType],
      },
      { ...contract, functionName: 'tokenImpl' },
      { ...contract, functionName: 'governorImpl' },
      { ...contract, functionName: 'treasuryImpl' },
      { ...contract, functionName: 'auctionImpl' },
      { ...contract, functionName: 'metadataImpl' },
    ] as const,
  })

  const hasUndefinedAddresses = Object.keys(pickBy(addresses, isUndefined)).length > 0
  if (!data || isLoading || hasUndefinedAddresses || isError || !proposals) {
    return {
      shouldUpgrade: false,
      transaction: undefined,
      currentVersions: undefined,
      latest: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const [
    paused,
    latest,
    versions,
    tokenImpl,
    governorImpl,
    treasuryImpl,
    auctionImpl,
    metadataImpl,
  ] = data

  if (data.some(isNil)) {
    return {
      shouldUpgrade: false,
      latest: undefined,
      transaction: undefined,
      currentVersions: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const daoVersions = {
    governor: versions?.governor,
    token: versions?.token,
    treasury: versions?.treasury,
    auction: versions?.auction,
    metadata: versions?.metadata,
  }

  const managerImplementationAddresses: Record<ContractType, AddressType> = {
    governor: governorImpl,
    token: tokenImpl,
    treasury: treasuryImpl,
    auction: auctionImpl,
    metadata: metadataImpl,
  }

  const getUpgradesForVersion = (
    versions: DaoVersions,
    version: string
  ): Record<AddressType, string> =>
    pickBy(versions, (v) => isNil(v) || v === '' || lt(v, version))

  const givenVersion = contractVersion ? contractVersion : latest
  const upgradesNeededForGivenVersion = getUpgradesForVersion(daoVersions, givenVersion)

  // meets the required given version, no upgrades needed
  if (Object.values(upgradesNeededForGivenVersion).length === 0) {
    return {
      latest,
      currentVersions: daoVersions,
      shouldUpgrade: false,
      transaction: undefined,
      date: undefined,
      description: undefined,
      activeUpgradeProposalId: undefined,
      totalContractUpgrades: undefined,
    }
  }

  const withPauseUnpause = (
    paused: boolean,
    upgrades: Transaction[],
    auctionContract?: Contract
  ): Transaction[] => {
    if (paused || typeof auctionContract === undefined) {
      return upgrades
    }

    const pause = {
      target: addresses?.auction as AddressType,
      functionSignature: 'pause()',
      calldata: auctionContract?.interface.encodeFunctionData('pause') || '',
      value: '',
    }

    const unpause = {
      target: addresses?.auction as AddressType,
      functionSignature: 'unpause()',
      calldata: auctionContract?.interface.encodeFunctionData('unpause') || '',
      value: '',
    }

    return [pause, ...upgrades, unpause]
  }

  const createUpgradeTransactions = (
    upgrades: Record<AddressType, string>,
    managerContract?: Contract
  ): Transaction[] =>
    Object.keys(upgrades).map((contract) => ({
      value: '',
      target: addresses[contract as ContractType] as AddressType,
      functionSignature: 'upgradeTo(address)',
      calldata:
        managerContract?.interface?.encodeFunctionData('upgradeTo(address)', [
          managerImplementationAddresses[contract as ContractType],
        ]) || '',
    }))

  const findActiveUpgradeProposal = (
    proposals: Proposal[],
    upgrades: Transaction[]
  ): Proposal | undefined => {
    const activeProposals = proposals?.filter(
      (proposal) =>
        proposal.state === ProposalState.Active ||
        proposal.state === ProposalState.Pending ||
        proposal.state === ProposalState.Queued ||
        proposal.state === ProposalState.Succeeded
    )

    const upgradesCalldata = upgrades.map((upgrade) => upgrade.calldata)

    const upgradeInProgress = activeProposals.find(
      (proposal) => intersection(proposal.calldatas, upgradesCalldata).length > 0
    )

    return upgradeInProgress
  }

  const upgradesNeededForLatestVersion = getUpgradesForVersion(daoVersions, latest)

  const upgradeTransactions = createUpgradeTransactions(
    upgradesNeededForLatestVersion,
    managerContract ?? undefined
  )

  const activeUpgradeProposal = findActiveUpgradeProposal(
    proposals?.proposals,
    upgradeTransactions
  )

  const noActiveUpgradeProposal = typeof activeUpgradeProposal === 'undefined'

  const upgrade = {
    type: TransactionType.UPGRADE,
    summary: `Upgrade contracts to Nouns Builder v${latest}`,
    transactions: withPauseUnpause(
      paused,
      upgradeTransactions,
      auctionContract ?? undefined
    ),
  }

  return {
    latest,
    shouldUpgrade: noActiveUpgradeProposal,
    currentVersions: daoVersions,
    date: CONTRACT_VERSION_DETAILS?.[latest]['date'],
    description: `This release upgrades the DAO to v${latest} to add several features, improvements and bug fixes.`,
    totalContractUpgrades: upgradeTransactions.length,
    activeUpgradeProposalId: activeUpgradeProposal?.proposalId,
    transaction: upgrade,
  }
}
