import * as Sentry from '@sentry/nextjs'
import { Manager__factory } from 'src/constants/typechain'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { getProvider } from './provider'

export const getDaoContractAddresses = async (token: string): Promise<any> => {
  const contract = Manager__factory.connect(PUBLIC_MANAGER_ADDRESS, getProvider())
  try {
    const addresses = await contract.getAddresses(token)
    return {
      token: token,
      metadata: addresses.metadata,
      auction: addresses.auction,
      treasury: addresses.treasury,
      governor: addresses.governor,
    }
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)

    return {
      token: token,
      metadata: null,
      auction: null,
      treasury: null,
      governor: null,
    }
  }
}
