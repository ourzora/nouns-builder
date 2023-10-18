import { NextApiRequest, NextApiResponse } from 'next'

import { getSubscribers } from 'src/utils/pushWebhook'

const testPush = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subs = await getSubscribers()
    console.log('subs', subs)
    // res.status(200).json({ data: subs })
  } catch (err) {
    console.error('Error: ', err)
  }
}

export default testPush
