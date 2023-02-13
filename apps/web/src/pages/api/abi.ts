import * as Sentry from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ContractABIResult, getContractABIByAddress } from 'src/services/abiService'
import { NotFoundError, InvalidRequestError } from 'src/services/errors'
import { ErrorResult } from './errorResult'

const fetchRedis = async (
  req: NextApiRequest,
  res: NextApiResponse<ContractABIResult | ErrorResult>
) => {
  if (req.query.address && typeof req.query.address === 'string') {
    try {
      return res.status(200).json(await getContractABIByAddress(req.query.address))
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: 'abi not found' })
      }
      if (error instanceof InvalidRequestError) {
        return res.status(400).json({ error: 'bad address input ' })
      }

      Sentry.captureException(error)
      await Sentry.flush(2000)

      return res.status(500).json({ error: 'backend failed' })
    }
  } else {
    return res.status(404).json({ error: 'no address request' })
  }
}

export default fetchRedis
