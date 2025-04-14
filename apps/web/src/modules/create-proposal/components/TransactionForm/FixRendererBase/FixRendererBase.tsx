import { Box, Button, Paragraph } from '@zoralabs/zord'
import { encodeFunctionData } from 'viem'
import { useContractRead } from 'wagmi'

import { metadataAbi } from 'src/data/contract/abis'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'

import { RENDERER_BASE } from 'src/constants/rendererBase'

export const FixRendererBase = () => {
  const { metadata } = useDaoStore((state) => state.addresses)
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const chain = useChainStore((x) => x.chain)
  const { data: rendererBase } = useContractRead({
    abi: metadataAbi,
    address: metadata,
    chainId: chain.id,
    functionName: 'rendererBase',
  })

  const isRendererBaseFixed = rendererBase === RENDERER_BASE

  const handleFixRendererBaseTransaction = () => {
    const pause = {
      target: metadata as AddressType,
      functionSignature: 'updateRendererBase(string)',
      calldata: encodeFunctionData({
        abi: metadataAbi,
        functionName: 'updateRendererBase',
        args: [RENDERER_BASE],
      }),
      value: '',
    }

    addTransaction({
      type: TransactionType.FIX_RENDERER_BASE,
      summary: 'Fix Renderer Base',
      transactions: [pause],
    })
  }

  return (
    <Box w={'100%'}>
      {isRendererBaseFixed ? (
        <Box mb={'x8'}>
          <Paragraph size="md" color="negative">
            It looks like metadata renderer base is already set correctly for this DAO.
          </Paragraph>
        </Box>
      ) : (
        <Box mb={'x8'}>
          <Paragraph size="md" color="text1">
            No further input required for this transaction.
          </Paragraph>
        </Box>
      )}
      <Button
        variant={'outline'}
        borderRadius={'curved'}
        w={'100%'}
        type="button"
        onClick={handleFixRendererBaseTransaction}
        disabled={isRendererBaseFixed}
      >
        Add Transaction to Queue
      </Button>
    </Box>
  )
}
