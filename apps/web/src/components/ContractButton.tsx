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
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const chain = useChainStore((x) => x.chain)

  const { openConnectModal } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = () => switchNetwork?.(chain.id)

  return (
    <Button
      onClick={
        address == null
          ? openConnectModal
          : wagmiChain?.id != chain.id
          ? handleSwitchNetwork
          : handleClick
      }
      {...rest}
    >
      {children}
    </Button>
  )
}
