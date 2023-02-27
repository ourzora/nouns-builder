import { Button, Flex } from '@zoralabs/zord'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { Icon } from 'src/components/Icon'

import {
  adminStickySaveButton,
  adminStickySaveWrapper,
  confirmFormWrapper,
} from 'src/styles/Admin.css'
import {
  deployCheckboxHelperText,
  deployCheckboxStyleVariants,
} from 'src/styles/deploy.css'

interface StickySaveProps {
  confirmText: string
  disabled: boolean
  saveButtonText: string
  onSave: () => void
}

const confirmAnimation = {
  initial: {
    height: 0,
  },
  animate: {
    height: 'auto',
  },
}

const StickySave: React.FC<StickySaveProps> = ({
  confirmText,
  saveButtonText,
  disabled,
  onSave,
}) => {
  const [hasConfirmed, setHasConfirmed] = React.useState<boolean>(false)
  const [showConfirmBanner, setShowConfirmBanner] = React.useState<boolean>(false)

  const handleConfirm = () => {
    if (hasConfirmed) {
      setShowConfirmBanner(false)
    }
    setHasConfirmed(!hasConfirmed)
  }

  const handleSave = () => {
    if (!hasConfirmed) {
      setShowConfirmBanner(true)
    } else {
      onSave()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
      >
        <Flex
          direction={'column'}
          position={'fixed'}
          align={'center'}
          justify={'center'}
          bottom={'x0'}
          left={'x0'}
          width={'100%'}
          className={adminStickySaveWrapper}
        >
          <motion.div
            variants={confirmAnimation}
            initial={'initial'}
            animate={showConfirmBanner ? 'animate' : 'initial'}
          >
            <Flex direction={'column'} py={'x8'} px={'x4'} className={confirmFormWrapper}>
              <Flex align={'center'} justify={'center'} gap={'x4'}>
                <Flex
                  align={'center'}
                  justify={'center'}
                  className={
                    deployCheckboxStyleVariants[hasConfirmed ? 'confirmed' : 'default']
                  }
                  onClick={handleConfirm}
                >
                  {hasConfirmed && <Icon id="check" fill="background1" />}
                </Flex>
                <Flex className={deployCheckboxHelperText}>{confirmText}</Flex>
              </Flex>
            </Flex>
          </motion.div>
          <Flex backgroundColor="background1">
            <Button
              className={adminStickySaveButton}
              type={'submit'}
              my={'x3'}
              disabled={disabled}
              onClick={handleSave}
            >
              {hasConfirmed ? 'Confirm' : saveButtonText}
            </Button>
          </Flex>
        </Flex>
      </motion.div>
    </AnimatePresence>
  )
}

export default StickySave
