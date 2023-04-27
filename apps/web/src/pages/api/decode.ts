import * as Sentry from '@sentry/nextjs'
import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { getContractABIByAddress } from 'src/services/abiService'
import { InvalidRequestError, NotFoundError } from 'src/services/errors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contract, calldata } = req.body

  if (!contract) return res.status(404).json({ error: 'no address request' })
  if (!calldata) return res.status(404).json({ error: 'no calldata request' })

  try {
    const { abi } = await getContractABIByAddress(contract)
    const contractInterface = new ethers.utils.Interface(abi)
    const decodeResult = contractInterface.parseTransaction({ data: calldata })

    const args = decodeResult.args.map((item) => item.toString())
    const argMapping = decodeResult.functionFragment.inputs.reduce(
      (last: any, input: any, index: number) => {
        last[input.name] = {
          name: input.name,
          type: input.type,
          value: args[index],
        }
        return last
      },
      {}
    )

    const { maxAge, swr } = CACHE_TIMES.DECODE

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    res.status(200).json({
      args: argMapping,
      functionName: decodeResult.functionFragment.name,
      decoded: args,
    })
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
}
