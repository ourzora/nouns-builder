import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { CHAIN_STORE_IDENTIFIER } from 'src/stores/useChainStore'
import { Chain } from 'src/typings'

export const getChainFromLocalStorage = (): Chain => {
  const rawChain = localStorage.getItem(CHAIN_STORE_IDENTIFIER)
  return rawChain ? JSON.parse(rawChain)?.state?.chain : PUBLIC_DEFAULT_CHAINS[0]
}
