import React from 'react'
import { Button, Flex } from '@zoralabs/zord'
import {
  confirmButton,
  confirmRemoveHeadingStyle,
  confirmRemoveHelper,
  dismissButton,
} from './styles.css'

interface ConfrimRemoveProps {
  handleRemoveTransaction: () => void
  setOpenConfirm: (boolean: boolean) => void
}

const ConfirmRemove: React.FC<ConfrimRemoveProps> = ({
  handleRemoveTransaction,
  setOpenConfirm,
}) => {
  return (
    <Flex direction={'column'} align={'center'}>
      <Flex className={confirmRemoveHeadingStyle}>Are you sure?</Flex>
      <Flex className={confirmRemoveHelper}>
        This will remove the transaction from your proposal.
      </Flex>
      <Button className={confirmButton} onClick={() => handleRemoveTransaction()}>
        Yes
      </Button>
      <Button className={dismissButton} onClick={() => setOpenConfirm(false)}>
        Dismiss
      </Button>
    </Flex>
  )
}

export default ConfirmRemove
