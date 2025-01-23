import * as Sentry from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { decodeFunctionData, getAbiItem } from 'viem'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { getContractABIByAddress } from 'src/services/abiService'
import { InvalidRequestError, NotFoundError } from 'src/services/errors'
import { CHAIN_ID } from 'src/typings'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contract, calldata, chain } = req.body

  if (!contract) return res.status(404).json({ error: 'no address request' })
  if (!calldata) return res.status(404).json({ error: 'no calldata request' })
  if (!chain) return res.status(404).json({ error: 'no chain request' })

  const chainInt = parseInt(chain)

  try {
    const { abi } = await getContractABIByAddress(chainInt as CHAIN_ID, contract)
    const decodeResult = decodeFunctionData({ abi: JSON.parse(abi), data: calldata })
    const functionInfo = getAbiItem({
      abi: JSON.parse(abi),
      name:
        decodeResult.functionName !== 'release'
          ? decodeResult.functionName
          : '0x37bdc99b', // manually set function signature for release(_milestone) instead of release()
    })


    const argMapping = functionInfo.inputs.reduce(
      (last: any, input: any, index: number) => {
        last[input.name] = {
          name: input.name,
          type: input.type,
          value: decodeResult.args[index]?.toString(),
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
      functionName: decodeResult.functionName,
      decoded: decodeResult.args.map((x: any) => x.toString()),
    })
  } catch (error) {
    console.error(error)

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
