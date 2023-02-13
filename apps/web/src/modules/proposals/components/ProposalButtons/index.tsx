import useGovernorContract from 'src/hooks/useGovernorContract'
import { proposalActionButtonVariants } from 'src/styles/Proposals.css'
import { AddressType, BytesType } from 'src/typings'
import GovernorContractButton from './GovernorContractButton'
import { BigNumber } from 'ethers'

const Cancel: React.FC<{
  proposalId: string
  onSuccess: () => void
}> = (props) => {
  const { cancel } = useGovernorContract()

  const cancelTransaction = async () => {
    return await cancel(props.proposalId as BytesType)
  }

  return (
    <GovernorContractButton
      proposalTransaction={cancelTransaction}
      buttonText="Cancel Proposal"
      buttonClassName={proposalActionButtonVariants['cancel']}
      {...props}
    />
  )
}

const Veto: React.FC<{
  proposalId: string
  onSuccess: () => void
}> = (props) => {
  const { veto } = useGovernorContract()

  const vetoTransaction = async () => {
    return await veto(props.proposalId as BytesType)
  }

  return (
    <GovernorContractButton
      proposalTransaction={vetoTransaction}
      buttonText="Veto"
      buttonClassName={proposalActionButtonVariants['veto']}
      {...props}
    />
  )
}

const Queue: React.FC<{
  proposalId: string
  onSuccess: () => void
}> = (props) => {
  const { queue } = useGovernorContract()

  const queueTransaction = async () => {
    return await queue(props.proposalId as BytesType)
  }

  return (
    <GovernorContractButton
      proposalTransaction={queueTransaction}
      buttonText="Queue"
      buttonClassName={proposalActionButtonVariants['queue']}
      {...props}
    />
  )
}

const Execute: React.FC<{
  proposalId: string
  onSuccess: () => void
  proposer: AddressType
  descriptionHash: BytesType
  calldatas: BytesType[]
  targets: AddressType[]
  values: BigNumber[]
}> = ({ proposer, descriptionHash, calldatas, targets, values, ...props }) => {
  const { execute } = useGovernorContract()

  const executeTransaction = async () => {
    return await execute(targets, values, calldatas, descriptionHash, proposer)
  }

  return (
    <GovernorContractButton
      proposalTransaction={executeTransaction}
      buttonText="Execute"
      buttonClassName={proposalActionButtonVariants['execute']}
      {...props}
    />
  )
}

export { Cancel, Veto, Queue, Execute }
