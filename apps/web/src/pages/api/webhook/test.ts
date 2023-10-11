import { NextApiRequest, NextApiResponse } from 'next'
import { createWalletClient, http } from 'viem'
import { goerli } from 'viem/chains'

const testPush = async (req: NextApiRequest, res: NextApiResponse) => {
  const pk = `0x${process.env.TEST_PUSH_PK}`
  console.log('pk', pk)
  const alchemyKey = `https://eth-goerli.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_ID}`
  console.log('alchemyKey', alchemyKey)
  const client = createWalletClient({
    chain: goerli,
    transport: http(),
  })
}
