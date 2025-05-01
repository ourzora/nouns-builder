import axios from 'axios'
import { Address, isAddress } from 'viem'

import { AddressType, BytesType, CHAIN_ID } from 'src/typings'

import { createClient } from './createClient'
import { InvalidRequestError } from './errors'

export interface SimulationRequestBody {
  treasuryAddress: Address
  chainId: CHAIN_ID
  targets: string[]
  calldatas: string[]
  values: string[]
}

export interface Simulation {
  index: number
  simulationId: string
  success: boolean
  simulationUrl: string
  gasUsed: string
}

export interface SimulationResult {
  simulations: Simulation[]
  success: boolean
  totalGasUsed: string
}

const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY } = process.env

const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`
const TENDERLY_FORK_V2_BASE_URL = `https://api.tenderly.co/api/v2/project/${TENDERLY_PROJECT}/forks`

export async function simulate({
  treasuryAddress,
  chainId,
  targets,
  calldatas,
  values,
}: SimulationRequestBody): Promise<SimulationResult> {
  // Validate inputs
  if (targets?.length !== calldatas?.length && targets?.length !== values?.length) {
    throw new InvalidRequestError('Array length mismatch')
  }
  if (!isAddress(treasuryAddress)) {
    throw new InvalidRequestError('Invalid treasury address')
  }
  const invalidAddresses = targets.filter((target) => !isAddress(target))
  if (invalidAddresses.length > 0) {
    throw new InvalidRequestError(
      `Invalid target addresses: [${invalidAddresses.join(',')}]`
    )
  }

  const opts = { headers: { 'X-Access-Key': TENDERLY_ACCESS_KEY as string } }
  const body = { network_id: chainId }

  const forkResponse = await axios.post(TENDERLY_FORK_API, body, opts)
  const forkId = forkResponse.data.simulation_fork.id
  const forkProvider = createClient(forkId, chainId)

  const simulations: Simulation[] = []

  let totalGasUsed = 0n

  // Loop through the transactions and simulate them against the fork
  for (let i = 0; i < targets.length; i++) {
    const txHash: `0x${string}` = await forkProvider.sendTransaction({
      account: treasuryAddress,
      to: targets[i].toLowerCase() as AddressType,
      gasPrice: 0n,
      value: BigInt(values[i]),
      data: calldatas[i] as BytesType,
    })

    const receipt = await forkProvider.getTransactionReceipt({ hash: txHash })

    const forkViewRes = (await axios.get(`${TENDERLY_FORK_V2_BASE_URL}/${forkId}`, opts))
      .data
    const simulationId = forkViewRes.fork.head_simulation_id
    simulations.push({
      index: i,
      simulationId,
      success: receipt.status !== 'reverted',
      simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
      gasUsed: receipt.gasUsed.toString(),
    })
    totalGasUsed += receipt.gasUsed
  }

  const simulationSucceeded = simulations.every((s) => s.success)

  // Delete the fork if all the simulations succeeded
  if (simulationSucceeded) {
    try {
      await axios.delete(`${TENDERLY_FORK_V2_BASE_URL}/${forkId}`, opts)
    } catch (e) {
      console.error('error deleting fork', e)
    }
  }

  return {
    simulations,
    success: simulationSucceeded,
    totalGasUsed: totalGasUsed.toString(),
  }
}
