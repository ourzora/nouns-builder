import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { Button, ButtonProps } from '@zoralabs/zord'
import { useAccount, useNetwork } from 'wagmi'

interface ContractButtonProps extends ButtonProps {
  handleClick: () => void
}

export const ContractButton = ({
  children,
  handleClick,
  ...rest
}: ContractButtonProps) => {
  const { address } = useAccount()
  const { chain } = useNetwork()

  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()

  return (
    <Button
      onClick={
        address == null
          ? openConnectModal
          : chain?.unsupported
          ? openChainModal
          : handleClick
      }
      {...rest}
    >
      {children}
    </Button>
  )
}
