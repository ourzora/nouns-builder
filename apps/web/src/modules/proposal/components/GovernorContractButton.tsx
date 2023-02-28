import { Box } from '@zoralabs/zord'
import { ContractTransaction } from 'ethers'
import React, { useState } from 'react'
import { useSWRConfig } from 'swr'

import { ContractButton } from 'src/components/ContractButton'
import { uploadingSpinnerWhite } from 'src/components/Layout/styles.css'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProposal } from 'src/data/graphql/requests/proposalQuery'
import { useGovernorContract } from 'src/hooks'
import { useLayoutStore } from 'src/stores'

interface GovernorContractButtonProps {
  buttonText: string
  buttonClassName: string
  proposalId: string
  proposalTransaction: () => Promise<ContractTransaction | undefined>
  onSuccess: () => void
}

export const GovernorContractButton: React.FC<GovernorContractButtonProps> = ({
  buttonText,
  buttonClassName,
  proposalId,
  proposalTransaction,
  onSuccess,
}) => {
  const signer = useLayoutStore((state) => state.signer)
  const { contract: governorContract } = useGovernorContract()
  const { mutate } = useSWRConfig()

  const [isPending, setIsPending] = useState<boolean>(false)

  const handleProposalTransaction = React.useCallback(async () => {
    const isWrongNetwork =
      (await signer?.provider?.getCode(governorContract?.address || '')) === '0x'
    if (!proposalId || isWrongNetwork) return

    try {
      const tx = await proposalTransaction()
      setIsPending(true)
      await (tx as ContractTransaction)?.wait()
      await mutate([SWR_KEYS.PROPOSAL, proposalId], getProposal(proposalId))
      setIsPending(false)
      onSuccess()
    } catch (err) {
      setIsPending(false)
      console.log('err', err)
    }
  }, [signer, governorContract, proposalId, proposalTransaction, onSuccess, mutate])

  return (
    <ContractButton
      handleClick={handleProposalTransaction}
      className={buttonClassName}
      disabled={isPending}
    >
      {isPending ? <Box className={uploadingSpinnerWhite} /> : buttonText}
    </ContractButton>
  )
}
