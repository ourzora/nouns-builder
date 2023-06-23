import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { getFarcasterProfile } from 'src/data/farcaster/queries/farcasterProfile.ts'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fid } = req.query
  console.log('fid', fid)
  const profileRes = await getFarcasterProfile(Number(fid))
  const { maxAge, swr } = CACHE_TIMES.CASTR_PROFILE
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
  )

  return res.status(200).json(profileRes)
}
export default handler
