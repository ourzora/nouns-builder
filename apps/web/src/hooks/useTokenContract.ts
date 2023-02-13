import { Token, Token__factory } from 'src/constants/typechain'
import React, { useEffect } from 'react'
import { useDaoStore } from 'src/stores/useDaoStore'
import { getProvider } from 'src/utils/provider'
import useSWR from 'swr'
import { useSigner } from 'wagmi'
import SWR_KEYS from 'src/constants/swrKeys'

interface auctionResponseProps {
  contract: Token | undefined
  delegate: (to: string) => void
  delegateAddress?: string
  name: string | undefined
  symbol: string | undefined
  totalSupply: number | undefined
  owner: string | undefined
  hasVotes: number | undefined
}

const useTokenContract = () => {
  const { data: signer } = useSigner()
  const addresses = useDaoStore().addresses

  const contract = React.useMemo(() => {
    if (!addresses.token) return

    let contract: Token
    if (signer) {
      contract = new Token__factory(signer).attach(addresses?.token)
    } else {
      contract = Token__factory.connect(addresses?.token, getProvider())
    }

    return contract
  }, [signer, addresses])

  // delegate to
  const delegate = React.useCallback(
    async (to: string) => {
      if (!contract) return

      const { wait } = await contract.delegate(to)
      await wait()
    },
    [contract]
  )

  // owner
  const { data: owner } = useSWR(
    contract ? SWR_KEYS.DYNAMIC.TOKEN_CONTRACT.OWNER(addresses?.token as string) : null,
    async () => {
      return await contract?.owner()
    },
    { revalidateOnFocus: false }
  )

  // name
  const { data: name } = useSWR(
    contract ? SWR_KEYS.DYNAMIC.TOKEN_CONTRACT.NAME(addresses?.token as string) : null,
    async () => {
      return await contract?.name()
    }
  )

  // symbol
  const { data: symbol } = useSWR(
    contract ? SWR_KEYS.DYNAMIC.TOKEN_CONTRACT.SYMBOL(addresses?.token as string) : null,
    async () => {
      return await contract?.symbol()
    },
    { revalidateOnFocus: false }
  )

  const { data: delegateAddress } = useSWR(
    contract && signer
      ? SWR_KEYS.DYNAMIC.TOKEN_CONTRACT.DELEGATES(addresses?.token as string)
      : null,
    () => signer?.getAddress().then((address) => contract?.delegates(address))
  )

  const { data: hasVotes } = useSWR(
    contract && signer
      ? SWR_KEYS.DYNAMIC.TOKEN_CONTRACT.HAS_VOTES(addresses?.token as string)
      : null,
    () =>
      signer?.getAddress().then(async (address) => {
        const votes = await contract?.getVotes(address)
        return votes?.toNumber()
      })
  )

  /* get total supply */
  const [totalSupply, setTotalSupply] = React.useState<number>()
  useEffect(() => {
    if (!addresses?.token) return

    const getTotalSupply = async (token: string) => {
      const tokenContract = Token__factory.connect(token, getProvider())
      const total = await tokenContract?.totalSupply()
      setTotalSupply(Number(total))
    }

    getTotalSupply(addresses?.token)
  }, [addresses])

  const response: auctionResponseProps = {
    contract,
    delegateAddress,
    delegate,
    name,
    symbol,
    totalSupply,
    owner,
    hasVotes,
  }

  return { ...response }
}

export default useTokenContract
