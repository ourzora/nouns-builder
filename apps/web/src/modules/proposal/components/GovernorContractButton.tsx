import { PrepareWriteContractConfig, Signer } from '@wagmi/core'
import { Box, ButtonProps } from '@zoralabs/zord'
import React, { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { ContractButton } from 'src/components/ContractButton'
import SWR_KEYS from 'src/constants/swrKeys'
import { governorAbi } from 'src/data/contract/abis'
import { getProposal } from 'src/data/subgraph/requests/proposalQuery'
import { useDaoStore } from 'src/modules/dao'

import { uploadingSpinnerWhite } from './GovernorContractButton.css'

type GovernorContractButtonProps<
  TFunctionName extends string = string,
  TChainId extends number = number,
  TSigner extends Signer = Signer
> = Pick<
  PrepareWriteContractConfig<typeof governorAbi, TFunctionName, TChainId, TSigner>,
  'args' | 'functionName'
> & {
  proposalId: string
  buttonText: string
  buttonClassName?: string
  onSuccess: () => void
} & ButtonProps

export function GovernorContractButton<
  TFunctionName extends string = string,
  TChainId extends number = number,
  TSigner extends Signer = Signer
>({
  functionName,
  args,
  proposalId,
  buttonText,
  buttonClassName,
  onSuccess,
  ...rest
}: GovernorContractButtonProps) {
  const { addresses } = useDaoStore()
  const { mutate } = useSWRConfig()

  const [isPending, setIsPending] = useState<boolean>(false)

  const { config, isError } = usePrepareContractWrite({
    enabled: !!addresses?.governor,
    address: addresses?.governor,
    abi: governorAbi,
    functionName: functionName,
    args: args,
  })

  const { writeAsync } = useContractWrite(config)

  const handleClick = async () => {
    try {
      setIsPending(true)
      const txn = await writeAsync?.()
      await txn?.wait()

      await mutate([SWR_KEYS.PROPOSAL, proposalId], getProposal(proposalId))
      setIsPending(false)
      onSuccess()
    } catch (err) {
      setIsPending(false)
      console.log('err', err)
    }
  }

  return (
    <ContractButton
      handleClick={handleClick}
      className={buttonClassName}
      disabled={isPending || isError}
      {...rest}
    >
      {isPending ? <Box className={uploadingSpinnerWhite} /> : buttonText}
    </ContractButton>
  )
}
