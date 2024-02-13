import { getPublicClient, readContract } from 'wagmi/actions'

import { L2_MIGRATION_DEPLOYER } from 'src/constants/addresses'
import { L2DeployerABI } from 'src/data/contract/abis/L2MigrationDeployer'
import { AddressType, CHAIN_ID } from 'src/typings'

// We are calling a pure function so we can default to any network with an L2 migration deployer
const DEFAULT_L2_CHAIN_ID = CHAIN_ID.BASE

export const applyL1ToL2Alias = async ({
  l1ChainId,
  l2ChainId = DEFAULT_L2_CHAIN_ID,
  address,
}: {
  l1ChainId: CHAIN_ID
  l2ChainId?: CHAIN_ID
  address: AddressType
}) => {
  const publicClient = getPublicClient({ chainId: l1ChainId })

  const bytecode = await publicClient.getBytecode({ address })
  if (bytecode) {
    return await readContract({
      abi: L2DeployerABI,
      address: L2_MIGRATION_DEPLOYER[l2ChainId],
      chainId: l2ChainId,
      functionName: 'applyL1ToL2Alias',
      args: [address],
    })
  }

  return address
}
