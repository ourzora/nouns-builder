import { Box, Flex } from '@zoralabs/zord'
import React from 'react'

import { useFormStore } from 'src/stores/useFormStore'

import { uploadNotificationWrapper, uploadingSpinner } from './styles.css'

const Uploading = () => {
  const { isUploadingToIPFS } = useFormStore()

  return (
    <>
      {isUploadingToIPFS && (
        <Flex
          position={'fixed'}
          pl={'x8'}
          pt={'x4'}
          bottom={'x5'}
          width={'100%'}
          className={uploadNotificationWrapper}
          align={'flex-end'}
          justify={'flex-end'}
          right={'x8'}
        >
          <Flex align={'center'} justify={'center'}>
            <Box fontSize={14}>Uploading Artwork to IPFS</Box>
            <Box className={uploadingSpinner} mx={'x4'} />
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default Uploading
