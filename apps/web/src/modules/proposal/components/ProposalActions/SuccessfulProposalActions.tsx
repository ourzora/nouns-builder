import { Flex, Text, vars } from '@zoralabs/zord'
import { BigNumber } from 'ethers'
import React, { Fragment, useState } from 'react'
import { useSWRConfig } from 'swr'
import { Address } from 'wagmi'

import { Countdown } from 'src/components/Countdown'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProposal } from 'src/data/graphql/requests/proposalQuery'
import { proposalActionButtonVariants } from 'src/styles/Proposals.css'
import { BytesType, Proposal, ProposalStatus, ProposalSucceededStatus } from 'src/typings'

import { isProposalSuccessful } from '../../utils'
import { GovernorContractButton } from '../GovernorContractButton'

interface SuccessfulProposalActionsProps {
  proposal: Proposal
}

const Queue: React.FC<{
  proposalId: string
  onSuccess: () => void
}> = (props) => {
  return (
    <GovernorContractButton
      functionName="queue"
      args={[props.proposalId as Address]}
      buttonText="Queue"
      buttonClassName={proposalActionButtonVariants['queue']}
      {...props}
    />
  )
}

const Execute: React.FC<{
  proposalId: string
  onSuccess: () => void
  proposer: Address
  descriptionHash: BytesType
  calldatas: BytesType[]
  targets: Address[]
  values: BigNumber[]
}> = ({ proposer, descriptionHash, calldatas, targets, values, ...props }) => {
  return (
    <GovernorContractButton
      functionName="execute"
      args={[targets, values, calldatas, descriptionHash, proposer]}
      buttonText="Execute"
      buttonClassName={proposalActionButtonVariants['execute']}
      {...props}
    />
  )
}

export const SuccessfulProposalActions: React.FC<SuccessfulProposalActionsProps> = ({
  proposal,
}) => {
  const { mutate } = useSWRConfig()

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState({ title: '', subtitle: '' })

  const onSuccessModalClose = () => {
    setShowSuccessModal(false)
    setModalContent({ title: '', subtitle: '' })
  }

  const onActionSuccess = (modalContent: { title: string; subtitle: string }) => {
    setModalContent(modalContent)
    setShowSuccessModal(true)
  }

  const onEnd = () => {
    mutate([SWR_KEYS.PROPOSAL, proposalId], getProposal(proposalId))
  }

  const {
    proposalId,
    status,
    calldatas,
    targets,
    values,
    descriptionHash,
    proposer,
    expiresAt,
    executableFrom,
  } = proposal

  const getBorderColor = (state: ProposalSucceededStatus) => {
    if (state === ProposalStatus.Succeeded) {
      return '#F2E2F7'
    }
    if (state === ProposalStatus.Queued) {
      return vars.color.border
    }
    if (state === ProposalStatus.Executable) {
      return '#D3E5FB'
    }
  }

  if (!isProposalSuccessful(status)) {
    return null
  }

  return (
    <Flex
      direction={{ '@initial': 'column', '@768': 'row' }}
      w={'100%'}
      gap={{ '@initial': 'x3', '@768': 'x0' }}
      align={'center'}
      p={{ '@initial': 'x4', '@768': 'x6' }}
      borderStyle={'solid'}
      borderWidth={'normal'}
      borderRadius={'curved'}
      style={{
        borderColor: getBorderColor(status),
      }}
    >
      {/* proposal is in queue-able state */}
      {status === ProposalStatus.Succeeded && (
        <Fragment>
          <Flex w={{ '@initial': '100%', '@768': 'auto' }} justify={'center'}>
            <Queue
              proposalId={proposalId}
              onSuccess={() =>
                onActionSuccess({
                  title: 'Proposal Queued',
                  subtitle: 'You’ve successfully queued this proposal',
                })
              }
            />
          </Flex>
          <Flex textAlign={'center'}>
            <Text
              color={'text3'}
              variant={'paragraph-md'}
              ml={{ '@initial': 'x0', '@768': 'x3' }}
            >
              Queue this proposal before it expires
            </Text>
          </Flex>
        </Fragment>
      )}

      {/* has been queued, countdown to executable */}
      {status === ProposalStatus.Queued && (
        <Fragment>
          <Flex
            w={{ '@initial': '100%', '@768': 'auto' }}
            justify={'center'}
            align={'center'}
            borderRadius={'curved'}
            borderColor={'border'}
            borderWidth={'normal'}
            borderStyle={'solid'}
            px={'x2'}
            py={'x4'}
            style={{ background: '#FBFBFB', maxHeight: 40, minWidth: 124 }}
          >
            <Text
              fontWeight={'display'}
              style={{ fontVariantNumeric: 'tabular-nums', fontFeatureSettings: 'tnum' }}
            >
              <Countdown end={executableFrom!} onEnd={onEnd} />
            </Text>
          </Flex>
          <Flex textAlign={'center'}>
            <Text
              color={'text3'}
              variant={'paragraph-md'}
              ml={{ '@initial': 'x0', '@768': 'x3' }}
            >
              Time remaining before this proposal can be executed
            </Text>
          </Flex>
        </Fragment>
      )}

      {/* proposal is in executable state */}
      {status === ProposalStatus.Executable && (
        <Fragment>
          <Flex w={{ '@initial': '100%', '@768': 'auto' }} justify={'center'}>
            <Execute
              proposalId={proposalId}
              onSuccess={() =>
                onActionSuccess({
                  title: 'Proposal Executed',
                  subtitle: 'You’ve successfully executed this proposal',
                })
              }
              targets={targets as Address[]}
              values={values.map((v) => BigNumber.from(v))}
              calldatas={calldatas.map((c) => c as BytesType)}
              descriptionHash={descriptionHash as BytesType}
              proposer={proposer as Address}
            />
          </Flex>

          <Flex textAlign={'center'}>
            <Text
              color={'text3'}
              variant={'paragraph-md'}
              ml={{ '@initial': 'x0', '@768': 'x3' }}
            >
              There's{' '}
              <Countdown
                end={expiresAt!}
                onEnd={onEnd}
                style={{
                  color: '#257CED',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: 'tnum',
                }}
              />{' '}
              left to execute this proposal before it expires
            </Text>
          </Flex>
        </Fragment>
      )}

      <AnimatedModal size={'small'} open={showSuccessModal} close={onSuccessModalClose}>
        <SuccessModalContent
          success={true}
          title={modalContent.title}
          subtitle={modalContent.subtitle}
        />
      </AnimatedModal>
    </Flex>
  )
}
