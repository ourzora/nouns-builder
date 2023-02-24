import * as Sentry from '@sentry/nextjs'
import { BigNumber } from 'ethers'
import { base64 } from 'ethers/lib/utils'
import { readContract } from '@wagmi/core'

import { tokenQuery, tokenWinnerQuery } from 'src/data/graphql/requests/tokenQuery'
import { tokenAbi } from 'src/data/contract/abis'
import { AddressType} from 'src/typings'
import { TokenWithWinner } from "../../../modules/dao";

const readTokenContractData = async (
  tokenAddress: AddressType,
  id: string
): Promise<
  | {
      name: string
      image: string
      description: string
    }
  | undefined
> => {
  const result = await readContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'tokenURI',
    args: [BigNumber.from(id)],
  })

  const decodeToUintArr = base64.decode(result?.substring(29, result.length) as string) //remove the url info from base64 encoding
  const parsedBuffer = Buffer.from(decodeToUintArr)
    .toString('utf-8')
    .replace(/style="/g, "style='")
    .replace(/;"/g, ";'") // using regex replace methods to prevent json parse error in the case of style tags with double quotes

  try {
    return JSON.parse(parsedBuffer)
  } catch (e) {
    return
  }
}

const getToken = async (
  tokenAddress: AddressType,
  id: string
): Promise<TokenWithWinner | undefined> => {
  try {
    const [token, tokenWinner] = await Promise.all([
      await tokenQuery(tokenAddress, id),
      await tokenWinnerQuery(tokenAddress, id),
    ])

    const tokenData: TokenWithWinner = {
      id,
      ...token,
      ...tokenWinner,
    }

    // fallback contract data, i.e. for when the data returned from the zora API has not
    // caught up to the latest token data
    if (!tokenData?.name || !tokenData?.image || !tokenData.description) {
      const tokenContractRes = await readTokenContractData(tokenAddress, id)
      if (tokenContractRes) {
        return {
          ...tokenData,
          name: tokenData.name || tokenContractRes.name,
          image: tokenData.image || tokenContractRes.image,
          description: tokenData.description || tokenContractRes.description,
        }
      }
    }

    return tokenData
  } catch (e) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return
  }
}

export default getToken
