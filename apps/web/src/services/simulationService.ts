import axios from 'axios'
import { Address, createPublicClient, http, isAddress, parseEther, toHex } from 'viem'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { CHAIN_ID } from 'src/typings'

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
  gasUsed: bigint
}

export interface SimulationResult {
  simulations: Simulation[]
  success: boolean
  totalGasUsed: bigint
}

const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY } = process.env

const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`
const TENDERLY_FORK_V2_BASE_URL =
  'https://api.tenderly.co/api/v2/project/nouns-builder-public/forks'

const MOCK_BALANCE = parseEther('100')

export class InsufficientFundsError extends Error {}

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
  const forkProvider = createPublicClient({
    chain: PUBLIC_ALL_CHAINS.find((x) => x.id === chainId),
    transport: http(`https://rpc.tenderly.co/fork/${forkId}`),
  })

  const simulations: Simulation[] = []

  // Mock balance of treasury to ensure gas costs are covered as this will be covered by proposal
  // executor in reality
  await forkProvider.request({
    method: 'tenderly_addBalance' as any,
    arguments: [[treasuryAddress], toHex(MOCK_BALANCE)],
  })

  let totalGasUsed = 0n

  // Loop through the transactions and simulate them against the fork
  for (let i = 0; i < targets.length; i++) {
    const txParams = {
      from: treasuryAddress.toLowerCase(),
      to: targets[i].toLowerCase(),
      gas: '0x163CCD40',
      gasPrice: '0x3',
      // We have to wrap this in a hexValue() call because .toHexString() adds a 0x0 padding to the front of the value.
      value: toHex(BigInt(values[i]).toString(16)),
      data: calldatas[i],
    }
    const txHash: `0x${string}` = await forkProvider.request({
      method: 'eth_sendTransaction' as any,
      arguments: [txParams],
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
      gasUsed: receipt.gasUsed,
    })
    totalGasUsed += receipt.gasUsed
  }

  // Check final balance is greater than zero
  const balanceResponse = await forkProvider.getBalance({
    address: treasuryAddress,
    blockTag: 'latest',
  })

  // True final balance is balance + totalGas - MOCK_BALANCE
  const finalBalance = balanceResponse + totalGasUsed - MOCK_BALANCE

  if (finalBalance < 0) {
    throw new InsufficientFundsError()
  }

  const simulationSucceeded = simulations.every((s) => s.success)

  // Delete the fork if all the simulations succeeded
  if (simulationSucceeded) {
    try {
      await axios.delete(`${TENDERLY_FORK_V2_BASE_URL}/${forkId}`, opts)
      console.log(`successfully deleted fork with id ${forkId}`)
    } catch (e) {
      console.error('error deleting fork', e)
    }
  }

  return { simulations, success: simulationSucceeded, totalGasUsed }
}
