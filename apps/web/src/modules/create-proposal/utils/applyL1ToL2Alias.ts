import { getPublicClient, readContract } from 'wagmi/actions'

import { L2_MIGRATION_DEPLOYER } from 'src/constants/addresses'
import { L2DeployerABI } from 'src/data/contract/abis/L2MigrationDeployer'
import { AddressType, CHAIN_ID } from 'src/typings'

// We are calling a pure function. the result will be the same on any chain with an L2 deployer
const CHAIN_TO_QUERY = CHAIN_ID.BASE

export const applyL1ToL2Alias = async (chainId: CHAIN_ID, address: AddressType) => {
  const publicClient = getPublicClient({ chainId })

  const bytecode = await publicClient.getBytecode({ address })
  if (bytecode) {
    return await readContract({
      abi: L2DeployerABI,
      address: L2_MIGRATION_DEPLOYER[CHAIN_TO_QUERY],
      chainId: CHAIN_TO_QUERY,
      functionName: 'applyL1ToL2Alias',
      args: [address],
    })
  }

  return address
}
