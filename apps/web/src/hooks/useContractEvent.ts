import { useEffect, useRef } from 'react'

interface ContractEventProps {
  contract: any
  listener: (...event: any[]) => Promise<void>
  shouldAttach: boolean
  eventName: string
}

export const useContractEvent = ({
  contract,
  listener,
  eventName,
  shouldAttach,
}: ContractEventProps) => {
  useEffect(() => {
    if (!contract || !eventName || !shouldAttach) return

    contract.on(eventName, listener)

    return () => {
      contract.off(eventName, listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName])
}
