import {
  useWalletClient,
  type WalletClient
} from 'wagmi'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export async function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient

  if (!chain) throw new Error('Chain not found in public client')
  if (!account) throw new Error('Account not found in public client')

  const network = {
    chainId: chain.id,
    name: chain.name,
  }

  const provider = new ethers.BrowserProvider(transport, network)
  const signer = await provider.getSigner(account.address)
  return signer
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId })
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined)

  useEffect(() => {
    async function getSigner() {
      if (!walletClient) {
        setSigner(undefined)
        return
      }

      try {
        const newSigner = await walletClientToSigner(walletClient)
        setSigner(newSigner)
      } catch (error) {
        console.error('Failed to get signer', error)
        setSigner(undefined)
      }
    }

    getSigner()
  }, [walletClient])

  return signer
}