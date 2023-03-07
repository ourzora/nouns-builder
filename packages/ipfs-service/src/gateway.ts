import { isNormalizeableIPFSUrl, normalizeIPFSUrl } from './url'

export const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.decentralized-content.com'

export function ipfsGatewayUrl(url: string | null | undefined) {
  if (!url || typeof url !== 'string') return undefined
  const normalizedIPFSUrl = normalizeIPFSUrl(url)
  if (normalizedIPFSUrl) {
    return normalizedIPFSUrl.replace('ipfs://', `${IPFS_GATEWAY}/ipfs/`)
  }
  return undefined
}

export function getFetchableUrl(uri: string | null | undefined): string | undefined {
  if (!uri || typeof uri !== 'string') return undefined
  // If it can be turned into an IPFS URL
  if (isNormalizeableIPFSUrl(uri)) {
    // Return the gateway URL
    return ipfsGatewayUrl(uri)
  }
  // If it is already a url (or blob or data-uri)
  if (/^(https|data|blob):/.test(uri)) {
    // Return the URI
    return uri
  }
  return undefined
}
