import React, { ReactNode } from 'react'

interface NetworkControllerProps {
  children: ReactNode
}

interface FeatureContainerProps {
  children: ReactNode
}

const showFeature = (network: string) => network === process.env.NEXT_PUBLIC_NETWORK_TYPE

const FeatureMainnet = ({ children }: FeatureContainerProps) => {
  if (showFeature('mainnet')) return <>{children}</>
  return null
}

const FeatureTestnet = ({ children }: FeatureContainerProps) => {
  if (showFeature('testnet')) return <>{children}</>
  return null
}

export const NetworkController = ({ children }: NetworkControllerProps) => {
  return <>{children}</>
}

NetworkController.Mainnet = FeatureMainnet
NetworkController.Testnet = FeatureTestnet
