import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from '@zoralabs/zord'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'

import { useBridgeModal } from 'src/hooks/useBridgeModal'
import { useChainStore } from 'src/stores/useChainStore'

interface ContractButtonProps extends ButtonProps {
  handleClick: () => void
}

export const ContractButton = ({
  children,
  handleClick,
  ...rest
}: ContractButtonProps) => {
  const { address: userAddress } = useAccount()
  const { chain: userChain } = useNetwork()
  const appChain = useChainStore((x) => x.chain)
  const { canUserBridge, openBridgeModal } = useBridgeModal()
  const { data: userBalance } = useBalance({
    address: userAddress,
    chainId: appChain.id,
  })

  const { openConnectModal } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = () => switchNetwork?.(appChain.id)

  const handleClickWithValidation = () => {
    if (!userAddress) return openConnectModal?.()
    if (canUserBridge && userBalance?.value.eq(0)) return openBridgeModal()
    if (userChain?.id !== appChain.id) return handleSwitchNetwork()
    handleClick()
  }

  return (
    <Button onClick={handleClickWithValidation} {...rest}>
      {children}
    </Button>
  )
}
