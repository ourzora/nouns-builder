import { Flex } from '@zoralabs/zord'
import React, { useState } from 'react'
import { Address } from 'wagmi'

import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import { useLayoutStore } from 'src/stores'
import { proposalActionButtonVariants } from 'src/styles/Proposals.css'

import { GovernorContractButton } from '../GovernorContractButton'

interface CancelActionProps {
  proposalId: string
  showCancel?: boolean
  showVeto?: boolean
}

const Cancel: React.FC<{
  proposalId: string
  onSuccess: () => void
}> = (props) => {
  return (
    <GovernorContractButton
      functionName="cancel"
      args={[props.proposalId as Address]}
      buttonText="Cancel Proposal"
      buttonClassName={proposalActionButtonVariants['cancel']}
      {...props}
    />
  )
}

export const CancelAction: React.FC<CancelActionProps> = ({ proposalId }) => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState({ title: '', subtitle: '' })
  const isMobile = useLayoutStore((state) => state.isMobile)

  const onSuccessModalClose = () => {
    setShowSuccessModal(false)
    setModalContent({ title: '', subtitle: '' })
  }

  const onActionSuccess = (modalContent: { title: string; subtitle: string }) => {
    setModalContent(modalContent)
    setShowSuccessModal(true)
  }

  return (
    <>
      <Flex
        direction={{ '@initial': 'column-reverse', '@768': 'row' }}
        w={{ '@initial': '100%', '@768': 'auto' }}
        gap={'x2'}
        justify={'flex-end'}
        pt={{ '@initial': 'x3', '@768': 'x0' }}
        style={{
          borderTop: isMobile ? '2px solid #F2F2F2' : 'none',
        }}
      >
        <Cancel
          proposalId={proposalId}
          onSuccess={() =>
            onActionSuccess({
              title: 'Proposal Canceled',
              subtitle: 'You’ve successfully canceled this proposal',
            })
          }
        />
      </Flex>

      <AnimatedModal size={'small'} open={showSuccessModal} close={onSuccessModalClose}>
        <SuccessModalContent
          success={true}
          title={modalContent.title}
          subtitle={modalContent.subtitle}
        />
      </AnimatedModal>
    </>
  )
}
