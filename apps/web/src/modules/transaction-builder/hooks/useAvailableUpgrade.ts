import { auctionAbi, managerAbi } from 'src/constants/abis'
import lt from 'lodash/lt'
import pickBy from 'lodash/pickBy'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import dayjs from 'dayjs'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { CONTRACT_VERSION_DETAILS, VersionType } from 'src/modules/transaction-builder'
import { AddressType, DaoContractAddresses } from 'src/typings'
import { useContract, useContractReads } from 'wagmi'
import { Contract } from 'ethers'
import useSWR from 'swr'
import intersection from 'lodash/intersection'
import { sdk } from 'src/graphql/client'
import { CHAIN } from 'src/constants/network'
import { NounsProposalStatus, ProposalsWithCalldataQuery } from 'src/graphql/sdk'
import SWR_KEYS from 'src/constants/swrKeys'

export interface Upgrade {
  address: AddressType
  name: string
  calldata?: string
}

type Proposal = ProposalsWithCalldataQuery['nouns']['nounsProposals']['nodes'][number]

interface AvailableUpgrade {
  shouldUpgrade: boolean
  transactions: Upgrade[]
  title?: string
  summary?: string
  latest?: string
  date?: string
  description?: string
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

  const contractInstance = useContract(contract)

  const { data: proposals } = useSWR(
    !!addresses?.token ? [SWR_KEYS.PROPOSALS_CALLDATAS, addresses?.token] : null,
    () => sdk.proposalsWithCalldata({ token: addresses?.token, chain: CHAIN })
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
    ],
  })

  const hasUndefinedAddresses = Object.keys(pickBy(addresses, isUndefined)).length > 0
  if (!data || isLoading || hasUndefinedAddresses || isError || !proposals) {
    return {
      shouldUpgrade: false,
      transactions: [],
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
    return { shouldUpgrade: false, transactions: [] }
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

  const getUpgradesForVersion = (versions: DaoVersions, version: string) =>
    pickBy(versions, (v) => isNil(v) || v === '' || lt(v, version))

  const givenVersion = contractVersion ? contractVersion : latest
  const upgradesNeededForGivenVersion = getUpgradesForVersion(daoVersions, givenVersion)

  // meets the required given version, no upgrades needed
  if (Object.values(upgradesNeededForGivenVersion).length === 0) {
    return {
      shouldUpgrade: false,
      transactions: [],
    }
  }

  const withPauseUnpause = (
    paused: boolean,
    upgrades: Upgrade[],
    auctionContract?: Contract
  ) => {
    if (paused || typeof auctionContract === undefined) {
      return upgrades
    }

    const pause = {
      address: addresses?.auction as AddressType,
      name: 'pause()',
      calldata: auctionContract?.interface.encodeFunctionData('pause'),
    }

    const unpause = {
      address: addresses?.auction as AddressType,
      name: 'unpause()',
      calldata: auctionContract?.interface.encodeFunctionData('unpause'),
    }

    return [pause, ...upgrades, unpause]
  }

  const upgradesNeededForLatestVersion = getUpgradesForVersion(daoVersions, latest)
  const upgrades: Upgrade[] = Object.keys(upgradesNeededForLatestVersion).map(
    (contract) => ({
      address: addresses[contract as ContractType] as AddressType,
      name: 'upgradeTo(address)',
      calldata: contractInstance?.interface?.encodeFunctionData('upgradeTo(address)', [
        managerImplementationAddresses[contract as ContractType],
      ]),
    })
  )

  return {
    latest,
    title: `Nouns Builder Upgrade v${latest} ${dayjs().format('YYYY-MM-DD')}`,
    date: CONTRACT_VERSION_DETAILS?.[latest]['date'],
    description: CONTRACT_VERSION_DETAILS?.[latest]['description'],
    summary: CONTRACT_VERSION_DETAILS?.[latest]['summary'],
    totalContractUpgrades: upgrades.length,
    shouldUpgrade: checkForNoActiveUpgradeProposals(
      proposals?.nouns?.nounsProposals?.nodes,
      upgrades
    ),
    transactions: withPauseUnpause(paused, upgrades, auctionContract ?? undefined),
  }
}

function checkForNoActiveUpgradeProposals(
  proposals: Proposal[],
  upgrades: Upgrade[]
): boolean {
  const activeProposals = proposals?.filter(
    (proposal) =>
      proposal.status === NounsProposalStatus.Active ||
      proposal.status === NounsProposalStatus.Pending ||
      proposal.status === NounsProposalStatus.Queued ||
      proposal.status === NounsProposalStatus.Succeeded ||
      proposal.status === NounsProposalStatus.Executable
  )
  const proposalsCalldata = activeProposals.flatMap((proposal) => proposal.calldatas)
  const upgradesCalldata = upgrades.map((upgrade) => upgrade.calldata)
  return intersection(proposalsCalldata, upgradesCalldata).length === 0
}
