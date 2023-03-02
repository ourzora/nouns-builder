import { ethers } from 'ethers'

import { AddressType, DaoContractAddresses, DaoContracts } from 'src/typings'
import { toSeconds } from 'src/utils/helpers'
import { sanitizeStringForJSON } from 'src/utils/sanitize'

import { AdminFormValues } from '../components/AdminForm'

type FormValuesTransactionMap = {
  [K in keyof AdminFormValues]: {
    functionSignature: string
    getTarget: (addresses: DaoContractAddresses) => AddressType | undefined
    constructCalldata: (
      contracts: DaoContracts,
      value: AdminFormValues[K]
    ) => string | undefined
  }
}

export const formValuesToTransactionMap: FormValuesTransactionMap = {
  /* metadata */
  daoAvatar: {
    functionSignature: 'updateContractImage',
    getTarget: (addresses) => addresses.metadata as AddressType,
    constructCalldata: ({ metadataContract }, value) =>
      metadataContract?.interface.encodeFunctionData('updateContractImage(string)', [
        value,
      ]),
  },
  daoWebsite: {
    functionSignature: 'updateProjectURI',
    getTarget: (addresses) => addresses.metadata as AddressType,
    constructCalldata: ({ metadataContract }, value) =>
      metadataContract?.interface.encodeFunctionData('updateProjectURI(string)', [
        sanitizeStringForJSON(value),
      ]),
  },
  projectDescription: {
    functionSignature: 'updateDescription',
    getTarget: (addresses) => addresses.metadata as AddressType,
    constructCalldata: ({ metadataContract }, value) =>
      metadataContract?.interface.encodeFunctionData('updateDescription(string)', [
        sanitizeStringForJSON(value),
      ]),
  },
  rendererBase: {
    functionSignature: 'updateRendererBase',
    getTarget: (addresses) => addresses.metadata as AddressType,
    constructCalldata: ({ metadataContract }, value) =>
      metadataContract?.interface.encodeFunctionData('updateRendererBase(string)', [
        value,
      ]),
  },

  /* auction */
  auctionDuration: {
    functionSignature: 'setDuration',
    getTarget: (addresses) => addresses.auction as AddressType,
    constructCalldata: ({ auctionContract }, value) =>
      auctionContract?.interface.encodeFunctionData('setDuration(uint256)', [
        toSeconds(value),
      ]),
  },
  auctionReservePrice: {
    functionSignature: 'setReservePrice',
    getTarget: (addresses) => addresses.auction as AddressType,
    constructCalldata: ({ auctionContract }, value) =>
      auctionContract?.interface.encodeFunctionData('setReservePrice(uint256)', [
        ethers.utils.parseEther(value.toString()),
      ]),
  },

  /* governor */
  proposalThreshold: {
    functionSignature: 'updateProposalThresholdBps',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData(
        'updateProposalThresholdBps(uint256)',
        [Number((Number(value) * 100).toFixed(2))]
      ),
  },
  quorumThreshold: {
    functionSignature: 'updateQuorumVotesBps',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData(
        'updateQuorumThresholdBps(uint256)',
        [Number((Number(value) * 100).toFixed(2))]
      ),
  },
  votingPeriod: {
    functionSignature: 'updateVotingPeriod',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData('updateVotingPeriod(uint256)', [
        toSeconds(value),
      ]),
  },
  votingDelay: {
    functionSignature: 'updateVotingDelay',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData('updateVotingDelay(uint256)', [
        toSeconds(value),
      ]),
  },
  vetoPower: {
    functionSignature: 'burnVetoer',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData('burnVetoer()', []),
  },
  vetoer: {
    functionSignature: 'updateVetoer',
    getTarget: (addresses) => addresses.governor as AddressType,
    constructCalldata: ({ governorContract }, value) =>
      governorContract?.interface.encodeFunctionData('updateVetoer(address)', [value]),
  },
}
