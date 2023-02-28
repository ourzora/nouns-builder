import { GetContractResult } from '@wagmi/core'
import { ContractTransaction, constants } from 'ethers'
import { useCallback } from 'react'
import {
  Address,
  useAccount,
  useContract,
  useContractRead,
  useContractReads,
  useSigner,
} from 'wagmi'

import { tokenAbi } from 'src/data/contract/abis'
import { unpackOptionalArray } from 'src/utils/helpers'
import { useDaoStore } from 'src/modules/dao' 

type TokenContract = GetContractResult<typeof tokenAbi>

interface TokenContractInterface {
  contract?: TokenContract
  owner?: Address
  name?: string
  symbol?: string
  totalSupply: number
  delegateAddress?: string
  delegate: (to: Address) => Promise<ContractTransaction | undefined>
}

export const useTokenContract = (): TokenContractInterface => {
  const { data: signer } = useSigner()
  const addresses = useDaoStore().addresses
  const account = useAccount()

  const tokenContract = {
    abi: tokenAbi,
    address: addresses.token,
  }

  const { data } = useContractReads({
    contracts: [
      { ...tokenContract, functionName: 'owner' },
      { ...tokenContract, functionName: 'name' },
      { ...tokenContract, functionName: 'symbol' },
      { ...tokenContract, functionName: 'totalSupply' },
    ],
  })

  const [owner, name, symbol, totalSupply] = unpackOptionalArray(data, 5)

  // This needs to be separate from the other contract reads as it is an optional contract read
  const { data: delegateAddress } = useContractRead({
    ...tokenContract,
    functionName: 'delegates',
    args: [account?.address || constants.AddressZero],
    enabled: !!account?.address,
  })

  const contract = useContract({ ...tokenContract, signerOrProvider: signer })

  const delegate = useCallback(async (to: Address) => contract?.delegate(to), [contract])

  return {
    contract: contract || undefined,
    owner,
    name,
    symbol,
    totalSupply: Number(totalSupply),
    delegateAddress,
    delegate,
  }
}
