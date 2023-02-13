import React, { ReactNode } from 'react'

interface NetworkControllerProps {
  children: ReactNode
}

interface FeatureContainerProps {
  children: ReactNode
}

const showFeature = (chainId: string) => chainId === process.env.NEXT_PUBLIC_CHAIN_ID

const FeatureMainnet = ({ children }: FeatureContainerProps) => {
  if (showFeature('1')) return <>{children}</>
  return null
}

const FeatureTestnet = ({ children }: FeatureContainerProps) => {
  if (showFeature('5')) return <>{children}</>
  return null
}

export const NetworkController = ({ children }: NetworkControllerProps) => {
  return <>{children}</>
}

NetworkController.Mainnet = FeatureMainnet
NetworkController.Testnet = FeatureTestnet
