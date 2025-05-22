import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from '@zoralabs/zord'
import { useAccount, useBalance, useSwitchChain } from 'wagmi'

import { useBridgeModal } from 'src/hooks/useBridgeModal'
import { useChainStore } from 'src/stores/useChainStore'

interface ContractButtonProps extends ButtonProps {
  handleClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ContractButton = ({
  children,
  handleClick,
  ...rest
}: ContractButtonProps) => {
  const { address: userAddress, chain: userChain } = useAccount()
  const appChain = useChainStore((x) => x.chain)
  const { canUserBridge, openBridgeModal } = useBridgeModal()
  const { data: userBalance } = useBalance({
    address: userAddress,
    chainId: appChain.id,
  })

  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()

  const handleSwitchChain = () => switchChain?.({ chainId: appChain.id })

  const handleClickWithValidation = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!userAddress) return openConnectModal?.()
    if (canUserBridge && userBalance?.decimals === 0) return openBridgeModal()
    if (userChain?.id !== appChain.id) return handleSwitchChain()
    handleClick(e)
  }

  return (
    <Button onClick={handleClickWithValidation} {...rest}>
      {children}
    </Button>
  )
}
