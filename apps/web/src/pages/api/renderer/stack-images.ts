import { getFetchableUrls } from 'ipfs-service'
import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'

import { CACHE_TIMES } from 'src/constants/cacheTimes'

const SVG_DEFAULT_SIZE = 1080
const REQUEST_TIMEOUT = 10000 // 10s

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let images = req.query.images

  if (!images || !images.length)
    return res.status(400).json({ error: 'No images provided' })

  const { maxAge, swr } = CACHE_TIMES.DAO_FEED

  if (typeof images === 'string') images = [images]

  let imageData: Buffer[] = await Promise.all(
    images.map((imageUrl) => getImageData(imageUrl))
  )

  // Resize all images to a default size
  imageData = await Promise.all(
    imageData.map(async (x) =>
      sharp(x).resize(SVG_DEFAULT_SIZE, SVG_DEFAULT_SIZE, { fit: 'inside' }).toBuffer()
    )
  )

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

const getImageData = async (imageUrl: string): Promise<Buffer> => {
  const urls = getFetchableUrls(imageUrl)
  if (!urls?.length) throw new Error('Invalid IPFS url: ' + imageUrl)

  const fetchWithTimeout = async (url: string): Promise<Buffer> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const arrayBuffer = await res.arrayBuffer()
      return Buffer.from(arrayBuffer)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  const fetches = urls.map((url) =>
    fetchWithTimeout(url).then((data) => {
      // Once one fetch succeeds, no need for the others
      return data
    })
  )

  return Promise.any(fetches).catch(() => {
    throw new Error('Failed to fetch image from all fetchable URLs')
  })
}

export default handler

export const config = {
  runtime: 'nodejs',
  maxDuration: 20,
}
