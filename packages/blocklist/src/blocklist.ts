import sdnlistDev from '../sdnlist.dev.json'
import sdnlist from '../sdnlist.json'
import { ethers } from 'ethers'
import { useMemo } from 'react'

const environment = process.env.NODE_ENV || 'development'

type InputAddress = string | undefined
type Address = string

function parseAddress(address: InputAddress): Address | undefined {
  if (!address) return

  try {
    return ethers.utils.getAddress(address) as Address
  } catch (e) {
    return
  }
}

function cleanBlocklist(blocklist: InputAddress[]): Address[] {
  return blocklist
    .map((a) => parseAddress(a))
    .filter((a) => typeof a === 'string') as Address[]
}

const blocklistMap: Record<string, Address[]> = {
  production: cleanBlocklist(sdnlist),
  development: cleanBlocklist(sdnlistDev),
}

const blocklist =
  environment in blocklistMap ? blocklistMap[environment] : blocklistMap.development

export function isBlocked(address: InputAddress) {
  const parsed = parseAddress(address)
  return parsed && blocklist.includes(parsed)
}

export function useBlocklist(address: InputAddress) {
  return useMemo(() => isBlocked(address), [address])
}
