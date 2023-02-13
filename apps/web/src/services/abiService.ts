import { utils } from 'ethers'
import { getProvider } from '../utils/provider'
import axios from 'axios'
import { getRedisConnection } from './redisConnection'
import { InvalidRequestError, BackendFailedError, NotFoundError } from './errors'

const EIP1967_PROXY_STORAGE_SLOT =
  '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'

const getRedisKey = (chain: string, address: string) => `${chain}:${address}`

export type ContractABIResult = {
  abi: string
  address: string
  fetchedAddress: string
  source: 'fetched' | 'cache'
}

const CHAIN_API_LOOKUP: Record<string, string> = {
  '1': 'api',
  '5': 'api-goerli',
}

const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

export const getContractABIByAddress = async (
  addressInput?: string
): Promise<ContractABIResult> => {
  if (!addressInput) {
    throw new InvalidRequestError('Invalid address')
  }

  let address: any
  try {
    address = utils.getAddress(addressInput)
  } catch {
    throw new InvalidRequestError('Invalid address')
  }

  if (!address) {
    throw new InvalidRequestError('Invalid address')
  }

  let fetchedAddress = address

  // Only handles EIP1967 proxy slots – does not handle minimal proxies (EIP11)
  const proxyAddress = await getProvider().getStorageAt(
    address,
    EIP1967_PROXY_STORAGE_SLOT
  )
  if (proxyAddress != ZERO_BYTES32) {
    fetchedAddress = utils.hexZeroPad(
      utils.stripZeros(proxyAddress),
      20
    ) as typeof fetchedAddress
  }

  const chainIdStr = process.env.NEXT_PUBLIC_CHAIN_ID

  const redisConnection = getRedisConnection()

  let cache = await redisConnection?.get(getRedisKey(chainIdStr!, fetchedAddress))

  if (cache) {
    return {
      abi: JSON.parse(cache).result,
      address,
      fetchedAddress,
      source: 'cache',
    }
  } else {
    const etherscan = await axios.get(
      `https://${
        CHAIN_API_LOOKUP[chainIdStr || '1']
      }.etherscan.io/api?module=contract&action=getabi&address=${fetchedAddress}&apikey=${
        process.env.ETHERSCAN_API_KEY
      }`
    )

    if (etherscan.status !== 200) {
      throw new BackendFailedError('Remote request failed')
    }
    const abi = etherscan.data

    if (abi.status === '1') {
      redisConnection?.set(getRedisKey(chainIdStr!, fetchedAddress), JSON.stringify(abi))
      return {
        abi: abi.result,
        fetchedAddress,
        address,
        source: 'fetched',
      }
    } else {
      throw new NotFoundError('Not verified')
    }
  }
}
