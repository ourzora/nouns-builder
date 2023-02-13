import { expect, describe, it } from 'vitest'
import { getFetchableUrl, ipfsGatewayUrl, IPFS_GATEWAY } from './gateway'

const VALID_CID = 'bafkreidgvpkjawlxz6sffxzwgooowe5yt7i6wsyg236mfoks77nywkptdq'

describe('ipfsGatewayUrl', () => {
  it('handles already normalized urls', () => {
    const normalizedUrl = `ipfs://${VALID_CID}`
    expect(ipfsGatewayUrl(normalizedUrl)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles raw CIDs', () => {
    const rawCID = VALID_CID
    expect(ipfsGatewayUrl(rawCID)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles gateway urls', () => {
    const gatewayUrl = `https://my.gateway.com/ipfs/${VALID_CID}`
    expect(ipfsGatewayUrl(gatewayUrl)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles directory gateway urls', () => {
    const directoryCIDWithPath = `https://my.gateway.com/ipfs/${VALID_CID}/filename.txt`
    expect(ipfsGatewayUrl(directoryCIDWithPath)).toBe(
      `${IPFS_GATEWAY}/ipfs/${VALID_CID}/filename.txt`
    )
  })
  it('handles non-ipfs urls', () => {
    const nonIPFSUrl = `https://galverse.art/api/metadata/metadata.json`
    expect(ipfsGatewayUrl(nonIPFSUrl)).toBe(undefined)
  })
  it('handles invalid urls', () => {
    const invalidUrl = 'not a cid or url'
    expect(ipfsGatewayUrl(invalidUrl)).toBe(undefined)
  })
})

describe('getFetchableUrl', () => {
  it('handles already normalized urls', () => {
    const normalizedUrl = `ipfs://${VALID_CID}`
    expect(getFetchableUrl(normalizedUrl)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles raw CIDs', () => {
    const rawCID = VALID_CID
    expect(getFetchableUrl(rawCID)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles gateway urls', () => {
    const gatewayUrl = `https://my.gateway.com/ipfs/${VALID_CID}`
    expect(getFetchableUrl(gatewayUrl)).toBe(`${IPFS_GATEWAY}/ipfs/${VALID_CID}`)
  })
  it('handles directory gateway urls', () => {
    const directoryCIDWithPath = `https://my.gateway.com/ipfs/${VALID_CID}/filename.txt`
    expect(getFetchableUrl(directoryCIDWithPath)).toBe(
      `${IPFS_GATEWAY}/ipfs/${VALID_CID}/filename.txt`
    )
  })
  it('handles non-ipfs urls', () => {
    const nonIPFSUrl = `https://galverse.art/api/metadata/metadata.json`
    expect(getFetchableUrl(nonIPFSUrl)).toBe(nonIPFSUrl)
  })
  it('handles invalid urls', () => {
    const invalidUrl = 'not a cid or url'
    expect(getFetchableUrl(invalidUrl)).toBe(undefined)
  })
})
