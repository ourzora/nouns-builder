import { NextApiRequest, NextApiResponse } from 'next'
import { readContract } from 'wagmi/actions'

import { L2_MIGRATION_DEPLOYER, NULL_ADDRESS } from 'src/constants/addresses'
import { L2DeployerABI } from 'src/data/contract/abis/L2MigrationDeployer'
import { AddressType, CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

export interface L2MigratedResponse {
  migrated:
    | {
        l2TokenAddress: AddressType
        chainId: CHAIN_ID
      }
    | undefined
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { l1Treasury } = req.query

  const data = await readContract({
    address: L2_MIGRATION_DEPLOYER,
    chainId: CHAIN_ID.BASE_GOERLI,
    abi: L2DeployerABI,
    functionName: 'crossDomainDeployerToMigration',
    args: [l1Treasury as AddressType],
  })

  const [tokenAddress] = unpackOptionalArray(data, 3)
  if (tokenAddress === NULL_ADDRESS) {
    return res.status(200).send({ migrated: undefined })
  }

  res.status(200).send({
    migrated: {
      l2TokenAddress: tokenAddress,
      chainId: CHAIN_ID.BASE_GOERLI,
    },
  } as L2MigratedResponse)
}

export default handler
