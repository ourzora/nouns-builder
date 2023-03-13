import { Box, Button } from '@zoralabs/zord'
import { useContract, useContractRead } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { AddressType } from 'src/typings'

export const PauseAuctions = () => {
  const { auction } = useDaoStore((state) => state.addresses)
  const addTransaction = useProposalStore((state) => state.addTransaction)
  const auctionContract = useContract({ abi: auctionAbi, address: auction })
  const { data: paused } = useContractRead({
    abi: auctionAbi,
    address: auction,
    functionName: 'paused',
  })

  const handlePauseAuctionsTransaction = () => {
    if (paused || typeof auctionContract === 'undefined') return

    const pause = {
      target: auction as AddressType,
      functionSignature: 'pause()',
      calldata: auctionContract?.interface.encodeFunctionData('pause') || '',
      value: '',
    }

    addTransaction({
      type: TransactionType.PAUSE_AUCTIONS,
      summary: 'Pause auctions',
      transactions: [pause],
    })
  }

  return (
    <Box w={'100%'}>
      <Button
        variant={'outline'}
        borderRadius={'curved'}
        w={'100%'}
        type="button"
        onClick={handlePauseAuctionsTransaction}
      >
        Add Transaction to Queue
      </Button>
    </Box>
  )
}
