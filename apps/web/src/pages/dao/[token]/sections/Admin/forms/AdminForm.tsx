import { Flex } from '@zoralabs/zord'
import { BigNumber, Contract, ethers } from 'ethers'
import { FormikValues } from 'formik'
import React from 'react'
import Form from 'src/components/Fields/Form'
import {
  adminProposalFields,
  validateAdmin,
} from 'src/components/Fields/fields/adminForm'
import { NULL_ADDRESS } from 'src/constants/addresses'
import useAuctionContract from 'src/hooks/useAuctionContract'
import useGovernorContract from 'src/hooks/useGovernorContract'
import { useMetadataContract } from 'src/modules/dao/hooks'
import useTokenContract from 'src/hooks/useTokenContract'
import { useDaoStore, useLayoutStore } from 'src/stores'
import { getEnsAddress } from 'src/utils/ens'
import { fromSeconds, toSeconds } from 'src/utils/helpers'
import { sanitizeStringForJSON } from 'src/utils/sanitize'
import { useRouter } from 'next/router'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import {
  useProposalStore,
  BuilderTransaction,
} from 'src/modules/transaction-builder/stores/useProposalStore'
import { TransactionType } from 'src/modules/transaction-builder/constants/transactionTypes'
import type { AddressType } from 'src/typings'

interface AdminFormSettingsProps {
  title?: string
}

const AdminForm: React.FC<AdminFormSettingsProps> = () => {
  const {
    query: { token },
    push,
  } = useRouter()

  const {
    contract: auctionContract,
    auctionDuration: _auctionDuration,
    minBidIncrement,
    timeBuffer,
    auctionReservePrice,
    setDuration,
    setReservePrice,
    setTimeBuffer,
    setMinBidIncrementPercentage,
  } = useAuctionContract()

  const { name, symbol } = useTokenContract()

  const {
    contract: governorContract,
    updateQuorumVotesBps,
    updateProposalThreshold,
    updateVotingPeriod,
    updateVotingDelay,
    burnVetoer,
    updateVetoer,
    vetoer,
    votingPeriod,
    votingDelay,
    quorumVotesBps,
    proposalThresholdBps,
  } = useGovernorContract()

  const { createProposal } = useProposalStore()

  const { addresses } = useDaoStore()

  const { provider } = useLayoutStore()

  const {
    contract: metadataContract,
    contractURI,
    daoImage,
    daoWebsite,
    updateRendererBase,
    rendererBase,
    updateContractImage,
    updateProjectURI,
    updateDescription,
    description,
  } = useMetadataContract(addresses?.metadata as AddressType)
  /*

    construct params from contracts

  */

  /* auction duration */
  const auctionDuration = React.useMemo(() => {
    if (!_auctionDuration) return

    return fromSeconds(Number(_auctionDuration))
  }, [_auctionDuration])

  /* auction time buffer */
  const auctionTimeBuffer = React.useMemo(() => {
    if (!timeBuffer) return

    return fromSeconds(Number(timeBuffer))
  }, [timeBuffer])

  /*  auction reserve price  */
  const reservePrice = React.useMemo(() => {
    if (!auctionReservePrice) return
    return parseFloat(ethers.utils.formatUnits(auctionReservePrice))
  }, [auctionReservePrice])

  /* min bid increment  */
  const minBidIncrementPercentage = React.useMemo(() => {
    if (!minBidIncrement) return

    return Number(minBidIncrement)
  }, [minBidIncrement])

  /*

  initialize form with values from contract

   */
  const initialValues = React.useMemo(() => {
    return {
      /* artwork */
      projectDescription: description?.replace(/\\n/g, String.fromCharCode(13, 10)) || '',
      // artwork: []

      /* metadata */
      daoName: name || '',
      daoSymbol: symbol || '',
      daoAvatar: daoImage || '',
      rendererBase: rendererBase || '',
      daoWebsite: daoWebsite || '',

      /* governor */
      proposalThreshold: Number(proposalThresholdBps) / 100 || 0,
      quorumThreshold: Number(quorumVotesBps) / 100 || 0,
      votingPeriod: {
        days: fromSeconds(Number(votingPeriod)).days,
        hours: fromSeconds(Number(votingPeriod)).hours,
        minutes: fromSeconds(Number(votingPeriod)).minutes,
        seconds: fromSeconds(Number(votingPeriod)).seconds,
      },
      votingDelay: {
        days: fromSeconds(Number(votingDelay)).days,
        hours: fromSeconds(Number(votingDelay)).hours,
        minutes: fromSeconds(Number(votingDelay)).minutes,
        seconds: fromSeconds(Number(votingDelay)).seconds,
      },
      vetoPower: vetoer == NULL_ADDRESS ? 1 : 0,
      vetoer: vetoer || '',

      /* auction */
      auctionDuration: {
        minutes: auctionDuration?.minutes || 0,
        days: auctionDuration?.days || 0,
        hours: auctionDuration?.hours || 0,
        seconds: auctionDuration?.seconds || 0,
      },
      auctionReservePrice: reservePrice || 0,
      auctionTimeBuffer: {
        minutes: auctionTimeBuffer?.minutes,
        seconds: auctionTimeBuffer?.seconds,
      },
      minBidIncrementPercentage: minBidIncrementPercentage || 0,
    }
  }, [
    daoWebsite,
    daoImage,
    name,
    symbol,
    proposalThresholdBps,
    quorumVotesBps,
    auctionDuration,
    reservePrice,
    auctionTimeBuffer,
    minBidIncrementPercentage,
    vetoer,
    description,
    rendererBase,
    votingPeriod,
    votingDelay,
  ])

  interface updateMethodsProps {
    /* metadata */
    projectDescription: (description: string) => void
    rendererBase: (rendererBase: string) => void
    contractImage: (contractImage: string) => void
    daoWebsite: (daoWebsite: string) => void

    /* auction */
    auctionDuration: (duration: BigNumber) => void
    auctionReservePrice: (price: BigNumber) => void
    auctionTimeBuffer: (seconds: BigNumber) => void
    minBidIncrementPercentage: (seconds: BigNumber) => void

    /* governor */
    proposalThreshold: (threshold: number) => void
    quorumThreshold: (threshold: number) => void
    votingPeriod: (period: number) => void
    votingDelay: (delay: number) => void
    vetoPower: () => void
    vetoer: (vetoer: string) => void
  }

  const updateMethods = React.useMemo<updateMethodsProps | any>(() => {
    return {
      /* metadata */
      daoAvatar: { callback: updateContractImage, name: 'updateContractImage' },
      daoWebsite: { callback: updateProjectURI, name: 'updateProjectURI' },
      projectDescription: { callback: updateDescription, name: 'updateDescription' },
      rendererBase: { callback: updateRendererBase, name: 'updateRendererBase' },

      /* auction */
      auctionDuration: { callback: setDuration, name: 'setDuration' },
      auctionReservePrice: { callback: setReservePrice, name: 'setReservePrice' },
      auctionTimeBuffer: { callback: setTimeBuffer, name: 'setTimeBuffer' },
      minBidIncrementPercentage: {
        callback: setMinBidIncrementPercentage,
        name: 'setMinBidIncrementPercentage',
      },

      /* governor */
      proposalThreshold: {
        callback: updateProposalThreshold,
        name: 'updateProposalThresholdBps',
      },
      quorumThreshold: {
        callback: updateQuorumVotesBps,
        name: 'updateQuorumVotesBps',
      },
      votingPeriod: { callback: updateVotingPeriod, name: 'updateVotingPeriod' },
      votingDelay: { callback: updateVotingDelay, name: 'updateVotingDelay' },
      vetoPower: { callback: burnVetoer, name: 'burnVetoer' },
      vetoer: { callback: updateVetoer, name: 'updateVetoer' },
    }
  }, [
    updateContractImage,
    updateDescription,
    updateProjectURI,
    setDuration,
    setReservePrice,
    setTimeBuffer,
    setMinBidIncrementPercentage,
    updateQuorumVotesBps,
    updateProposalThreshold,
    updateVotingPeriod,
    updateVotingDelay,
    updateVetoer,
    burnVetoer,
    updateRendererBase,
  ])

  const addressesToContracts = React.useCallback(
    (address: string) => {
      switch (address) {
        case `${addresses.metadata}`:
          return metadataContract
        case `${addresses.auction}`:
          return auctionContract
        case `${addresses.governor}`:
          return governorContract
      }
    },
    [auctionContract, metadataContract, governorContract, addresses]
  )

  const fieldsToAddresses = React.useCallback(
    (field: string) => {
      switch (field) {
        case 'projectDescription':
        case 'daoAvatar':
        case 'daoWebsite':
        case 'rendererBase':
          return addresses.metadata as AddressType
        case 'auctionDuration':
        case 'auctionReservePrice':
        case 'auctionTimeBuffer':
        case 'minBidIncrementPercentage':
          return addresses.auction as AddressType
        case 'proposalThreshold':
        case 'quorumThreshold':
        case 'votingDelay':
        case 'votingPeriod':
        case 'vetoPower':
        case 'vetoer':
          return addresses.governor as AddressType
        default:
          return ''
      }
    },
    [addresses]
  )

  const fieldsToSignature = React.useCallback((field: string) => {
    switch (field) {
      case 'daoAvatar':
        return 'updateContractImage(string)'
      case 'daoWebsite':
        return 'updateProjectURI(string)'
      case 'projectDescription':
        return 'updateDescription(string)'
      case 'rendererBase':
        return 'updateRendererBase(string)'
      case 'auctionDuration':
        return 'setDuration(uint256)'
      case 'auctionReservePrice':
        return 'setReservePrice(uint256)'
      case 'auctionTimeBuffer':
        return 'setTimeBuffer(uint256)'
      case 'minBidIncrementPercentage':
        return 'setMinimumBidIncrement(uint256)'
      case 'proposalThreshold':
        return 'updateProposalThresholdBps(uint256)'
      case 'quorumThreshold':
        return 'updateQuorumThresholdBps(uint256)'
      case 'votingDelay':
        return 'updateVotingDelay(uint256)'
      case 'votingPeriod':
        return 'updateVotingPeriod(uint256)'
      case 'vetoPower':
        return 'burnVetoer()'
      case 'vetoer':
        return 'updateVetoer(address)'
    }
  }, [])

  const withPauseUnpause = (
    transactions: BuilderTransaction[],
    auctionAddress: AddressType,
    auctionContract?: Contract
  ) => {
    const targetAddresses = transactions
      .flatMap((txn) => txn.transactions)
      .map((txn) => txn.target)

    const pause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'pause()',
          target: auctionAddress as AddressType,
          calldata: auctionContract?.interface.encodeFunctionData('pause') || '',
          value: '',
        },
      ],
    }

    const unpause = {
      type: TransactionType.CUSTOM,
      transactions: [
        {
          functionSignature: 'unpause()',
          target: auctionAddress as AddressType,
          calldata: auctionContract?.interface.encodeFunctionData('unpause') || '',
          value: '',
        },
      ],
    }

    if (targetAddresses.includes(auctionAddress)) {
      return [pause, ...transactions, unpause]
    }

    return transactions
  }

  const handleUpdateSettings = React.useCallback(
    async (
      values: { field: string; value: any }[],
      setHasConfirmed: (hasConfirmed: {
        state: boolean | null
        values: {}[] | null
      }) => void,
      formik: FormikValues | undefined
    ) => {
      let transactions: BuilderTransaction[] = []
      for (const _value of values) {
        const field = _value?.field
        const callback = updateMethods[field]?.callback
        let value = _value?.value

        if (field === 'vetoer') {
          value = await getEnsAddress(value, provider)
        }

        const signature = fieldsToSignature(field)
        const constructCallData = (value: any) => {
          return addressesToContracts(
            // @ts-ignore //TODO: fix possible undefined
            fieldsToAddresses(field)
            // @ts-ignore //TODO: this seems like a typechain thing
          )?.interface.encodeFunctionData(signature, value)
        }

        const calldata = (field: string) => {
          switch (field) {
            case 'daoAvatar':
              return constructCallData([value])
            case 'daoWebsite':
              return constructCallData([sanitizeStringForJSON(value)])
            case 'projectDescription':
              return constructCallData([sanitizeStringForJSON(value)])
            case 'rendererBase':
              return constructCallData([value])
            case 'auctionDuration':
              return constructCallData([toSeconds(value)])
            case 'auctionReservePrice':
              return constructCallData([ethers.utils.parseEther(value.toString())])
            case 'auctionTimeBuffer':
              return constructCallData([toSeconds(value)])
            case 'minBidIncrementPercentage':
              return constructCallData([Number(value)])
            case 'proposalThreshold':
              return constructCallData([Number((Number(value) * 100).toFixed(2))])
            case 'quorumThreshold':
              return constructCallData([Number((Number(value) * 100).toFixed(2))])
            case 'votingDelay':
              return constructCallData([toSeconds(value)])
            case 'votingPeriod':
              return constructCallData([toSeconds(value)])
            case 'vetoPower':
              return constructCallData([])
            case 'vetoer':
              return constructCallData([value])
          }
        }

        transactions.push({
          type: TransactionType.CUSTOM,
          transactions: [
            {
              functionSignature: updateMethods[field]?.name,
              target: fieldsToAddresses(field) as AddressType,
              calldata: calldata(field) || '',
              value: '',
            },
          ],
        })

        // removes burnVetoer from the list of transactions if updateVetoer is present
        if (field === 'vetoer') {
          transactions = transactions.filter(
            (tx: BuilderTransaction) =>
              tx.transactions[0].functionSignature !== 'burnVetoer'
          )
        }
        if (field === 'vetoPower') {
          transactions = transactions.filter(
            (tx: BuilderTransaction) =>
              tx.transactions[0].functionSignature !== 'updateVetoer'
          )
        }
      }

      setHasConfirmed({ state: false, values: null })
      formik?.setSubmitting(true)

      const transactionsWithPauseUnpause = withPauseUnpause(
        transactions,
        addresses?.auction as AddressType,
        auctionContract
      )

      createProposal({
        disabled: false,
        title: undefined,
        summary: undefined,
        transactions: transactionsWithPauseUnpause,
      })

      push(`/dao/${token}/proposal/review`)
    },
    [
      updateMethods,
      token,
      addresses,
      auctionContract,
      createProposal,
      fieldsToSignature,
      fieldsToAddresses,
      addressesToContracts,
      provider,
      push,
    ]
  )

  return (
    <Flex direction={'column'} className={sectionWrapperStyle['admin']} mx={'auto'}>
      <Flex direction={'column'} w={'100%'}>
        <Form
          enableReinitialize
          fields={adminProposalFields}
          initialValues={initialValues}
          validationSchema={validateAdmin(provider)}
          buttonText={'Continue'}
          submitCallback={(values, setHasConfirmed, formik) =>
            handleUpdateSettings(values, setHasConfirmed, formik)
          }
          stickySave={true}
          compareReturn={true}
        />
      </Flex>
    </Flex>
  )
}

export default AdminForm
