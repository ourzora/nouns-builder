import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'

import { CACHE_TIMES } from 'src/constants/cacheTimes'

export const IPFS_GATEWAY =
  process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.decentralized-content.com'

export function ipfsGatewayUrl(url: string | null | undefined) {
  if (!url || typeof url !== 'string') return undefined
  return url.replace('ipfs://', `${IPFS_GATEWAY}/ipfs/`)
}

export const config = {
  runtime: 'edge',
}

const SVG_DEFAULT_SIZE = 1080

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let images = req.query.images

  if (!images || !images.length)
    return res.status(400).json({ error: 'No images provided' })

  const { maxAge, swr } = CACHE_TIMES.DAO_FEED

  if (typeof images === 'string') images = [images]

  let imageData: Buffer[] = await Promise.all(
    images.map((imageUrl) => getImageData(imageUrl))
  )

  const isSvg = images[0].includes('.svg')

  // Resize all SVGs to a default size
  if (isSvg) {
    imageData = await Promise.all(
      imageData.map(async (x) =>
        sharp(x).resize(SVG_DEFAULT_SIZE, SVG_DEFAULT_SIZE, { fit: 'inside' }).toBuffer()
      )
    )
  }

  const compositeParams = imageData.slice(1).map((x) => ({
    input: x,
    gravity: 'center',
  }))

  const compositeRes = await sharp(imageData[0])
    .composite(compositeParams)
    .webp({ quality: 75 })
    .toBuffer()

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )
  res.setHeader('Content-Type', 'image/webp')
  res.send(compositeRes)
}

const getImageData = async (imageUrl: string) => {
  const fetchableUrl = ipfsGatewayUrl(imageUrl)
  if (!fetchableUrl) throw new Error('Invalid IPFS url: ' + imageUrl)

  return axios
    .get(ipfsGatewayUrl(fetchableUrl)!, { responseType: 'arraybuffer' })
    .then((x) => Buffer.from(x.data, 'binary'))
}

export default handler
