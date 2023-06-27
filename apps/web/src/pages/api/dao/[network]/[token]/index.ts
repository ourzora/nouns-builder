import { NextApiRequest, NextApiResponse } from 'next'

import { CACHE_TIMES } from 'src/constants/cacheTimes'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import getDAOAddresses from 'src/data/contract/requests/getDAOAddresses'
import getDaoOgMetadata from 'src/data/contract/requests/getDaoOgMetadata'
import { DaoContractAddresses } from 'src/modules/dao'
import { AddressType } from 'src/typings'

export interface DaoResponse {
  collection: string
  collectionName: string
  collectionImage: string
  addresses: DaoContractAddresses
  ogImageURL: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { network, token } = req.query

    const collection = token as AddressType
    const chain = PUBLIC_DEFAULT_CHAINS.find((x) => x.slug == network)

    if (!chain) {
      return res.status(404).end()
    }

    const addresses = await getDAOAddresses(chain, collection)

    const daoOgMetadata = await getDaoOgMetadata(
      chain,
      collection,
      addresses?.metadata as string,
      addresses?.treasury as string
    )

    if (!(addresses && token)) {
      return res.status(404).end()
    }

    const protocol = process.env.VERCEL_ENV === 'development' ? 'http' : 'https'
    const ogImageURL = `${protocol}://${
      req.headers.host
    }/api/og/dao?data=${encodeURIComponent(JSON.stringify(daoOgMetadata))}`

    const { maxAge, swr } = CACHE_TIMES.TOKEN_INFO
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`
    )

    res.status(200).json({
      collection,
      collectionName: daoOgMetadata.name,
      collectionImage: daoOgMetadata.daoImage,
      addresses,
      ogImageURL,
    } as DaoResponse)
  } catch (err) {
    console.log('Dao err', err)
    res.status(500).send(err)
  }
}

export default handler
