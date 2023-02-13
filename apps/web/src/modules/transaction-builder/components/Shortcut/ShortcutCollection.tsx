import React from 'react'
import { Stack } from '@zoralabs/zord'
import ShortcutCard from './ShortcutCard'
import { TRANSACTION_TYPE, TransactionType } from '../../constants/transactionTypes'

const ShortcutCollection: React.FC<{ shortcuts: TransactionType[] }> = ({
  shortcuts,
}) => {
  return (
    <Stack>
      {shortcuts.map((shortcut) => (
        <ShortcutCard
          key={shortcut}
          transactionType={shortcut}
          queryParam={TRANSACTION_TYPE[shortcut].link}
        />
      ))}
    </Stack>
  )
}

export default ShortcutCollection
