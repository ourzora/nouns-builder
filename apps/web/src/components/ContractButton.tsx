import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from '@zoralabs/zord'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

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

  const { openConnectModal } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = () => switchNetwork?.(appChain.id)

  return (
    <Button
      onClick={
        !userAddress
          ? openConnectModal
          : userChain?.id !== appChain.id
          ? handleSwitchNetwork
          : handleClick
      }
      {...rest}
    >
      {children}
    </Button>
  )
}
