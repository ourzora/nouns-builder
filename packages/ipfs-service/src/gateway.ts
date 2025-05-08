import { isNormalizeableIPFSUrl, normalizeIPFSUrl } from './url'

const IPFS_GATEWAYS = [
  'https://nouns-builder.mypinata.cloud',
  'https://ipfs.io',
  'https://dweb.link',
  'https://w3s.link',
  'https://flk-ipfs.xyz',
  'https://ipfs.decentralized-content.com',
  'https://gateway.pinata.cloud',
]

export function ipfsGatewayUrls(url: string | null | undefined): string[] | undefined {
  if (!url || typeof url !== 'string') return undefined
  const normalizedIPFSUrl = normalizeIPFSUrl(url)
  if (normalizedIPFSUrl) {
    return IPFS_GATEWAYS.map(gateway => normalizedIPFSUrl.replace('ipfs://', `${gateway}/ipfs/`))
  }
  return undefined
}

export function getFetchableUrls(uri: string | null | undefined): string[] | undefined {
  if (!uri || typeof uri !== 'string') return undefined
  // If it can be turned into an IPFS URL
  if (isNormalizeableIPFSUrl(uri)) {
    // Return the gateway URL
    return ipfsGatewayUrls(uri)
  }
  // If it is already a url (or blob or data-uri)
  if (/^(https|data|blob):/.test(uri)) {
    // Return the URI
    return [uri]
  }
  return undefined
}
