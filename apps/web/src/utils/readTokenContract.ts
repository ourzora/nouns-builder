import * as Sentry from '@sentry/nextjs'
import { Token__factory } from 'src/constants/typechain'
import { base64 } from 'ethers/lib/utils'
import { tokenQuery, tokenWinnerQuery } from 'src/query/tokenQuery'
import { getProvider } from './provider'

export const readTokenContractData = async (tokenAddress: string, id: number) => {
  const contract = Token__factory.connect(tokenAddress, getProvider())

  const result = await contract.tokenURI(id)
  const decodeToUintArr = base64.decode(result?.substring(29, result.length) as string) //remove the url info from base64 encoding
  const parsedBuffer = Buffer.from(decodeToUintArr)
    .toString('utf-8')
    .replace(/style="/g, "style='")
    .replace(/;"/g, ";'") // using regex replace methods to prevent json parse error in the case of style tags with double quotes

  try {
    return JSON.parse(parsedBuffer)
  } catch (e) {
    return {
      name: null,
      image: null,
      description: null,
    }
  }
}

export const getToken = async (tokenAddress: string, id: number) => {
  try {
    const [tokenApiRes, tokenWinnerRes] = await Promise.all([
      await tokenQuery(tokenAddress, String(id)),
      await tokenWinnerQuery(tokenAddress, String(id)),
    ])

    const tokenData = {
      id,
      ...tokenApiRes,
      ...tokenWinnerRes,
    }

    // fallback contract data
    if (!tokenData?.name || !tokenData?.image || !tokenData.description) {
      const tokenContractRes = await readTokenContractData(tokenAddress, Number(id))
      return {
        ...tokenData,
        name: !tokenData.name ? tokenContractRes?.name : tokenData.name,
        image: !tokenData.image ? tokenContractRes?.image : tokenData.image,
        description: !tokenData.description
          ? tokenContractRes?.description
          : tokenData.description,
      }
    }

    return tokenData
  } catch (e) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return null
  }
}
