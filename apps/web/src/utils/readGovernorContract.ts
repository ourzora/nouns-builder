import { Governor__factory } from 'src/constants/typechain'
import { getProvider } from './provider'

export const readProposalThreshold = async (governorAddress: string): Promise<number> => {
  const contract = Governor__factory.connect(governorAddress, getProvider())

  const proposalThreshold = await contract.proposalThreshold()
  return proposalThreshold.toNumber()
}
