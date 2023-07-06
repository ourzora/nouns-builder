import { foundry } from 'wagmi/chains'

import { CHAIN_ID, Chain } from 'src/typings'

export const FOUNDRY_CHAIN: Chain = {
  ...foundry,
  id: CHAIN_ID.FOUNDRY,
  slug: '',
  icon: '',
}
