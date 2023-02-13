import { Flex } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import { TransactionType, TRANSACTION_TYPE } from '../constants/transactionTypes'

interface TransactionTypeIconProps {
  transactionType: TransactionType
  large?: boolean
}

const TransactionTypeIcon: React.FC<TransactionTypeIconProps> = ({
  transactionType,
  large,
}) => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      h={large ? 'x13' : 'x10'}
      w={large ? 'x13' : 'x10'}
      borderRadius={'round'}
      style={{ backgroundColor: TRANSACTION_TYPE[transactionType].iconBackdrop }}
      my={'x4'}
      minH={large ? 'x13' : 'x10'}
      minW={large ? 'x13' : 'x10'}
    >
      <Icon id={TRANSACTION_TYPE[transactionType].icon} fill={'transparent'} />
    </Flex>
  )
}

export default TransactionTypeIcon
