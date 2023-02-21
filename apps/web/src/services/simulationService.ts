import { StaticJsonRpcProvider } from '@ethersproject/providers'
import axios from 'axios'
import { BigNumber, constants, ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { InvalidRequestError } from './errors'

export interface SimulationRequestBody {
  treasuryAddress: string
  targets: string[]
  calldatas: string[]
  values: string[]
}

export interface Simulation {
  index: number
  simulationId: string
  success: boolean
  simulationUrl: string
  gasUsed: BigNumber
}

export interface SimulationResult {
  simulations: Simulation[]
  success: boolean
  totalGasUsed: BigNumber
}

const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY, NEXT_PUBLIC_CHAIN_ID } =
  process.env

const TENDERLY_FORK_API = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/fork`
const TENDERLY_FORK_V2_BASE_URL =
  'https://api.tenderly.co/api/v2/project/nouns-builder-public/forks'

const MOCK_BALANCE = ethers.utils.parseUnits('100', 'ether')

export class InsufficientFundsError extends Error {}

export async function simulate({
  treasuryAddress,
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
  const body = { network_id: NEXT_PUBLIC_CHAIN_ID }

  const forkResponse = await axios.post(TENDERLY_FORK_API, body, opts)
  const forkId = forkResponse.data.simulation_fork.id
  const forkProvider = new StaticJsonRpcProvider(`https://rpc.tenderly.co/fork/${forkId}`)

  const simulations: Simulation[] = []

  // Mock balance of treasury to ensure gas costs are covered as this will be covered by proposal
  // executor in reality
  await forkProvider.send('tenderly_addBalance', [
    [treasuryAddress],
    ethers.utils.hexValue(MOCK_BALANCE.toHexString()),
  ])

  let totalGasUsed: BigNumber = constants.Zero

  // Loop through the transactions and simulate them against the fork
  for (let i = 0; i < targets.length; i++) {
    const txParams = {
      from: treasuryAddress.toLowerCase(),
      to: targets[i].toLowerCase(),
      gas: '0x76999c0',
      gasPrice: '0x1',
      // We have to wrap this in a hexValue() call because .toHexString() adds a 0x0 padding to the front of the value.
      value: ethers.utils.hexValue(BigNumber.from(values[i]).toHexString()),
      data: calldatas[i],
    }
    const txHash = await forkProvider.send('eth_sendTransaction', [txParams])

    const receipt = await forkProvider.getTransactionReceipt(txHash)

    const forkViewRes = (await axios.get(`${TENDERLY_FORK_V2_BASE_URL}/${forkId}`, opts))
      .data
    const simulationId = forkViewRes.fork.head_simulation_id
    simulations.push({
      index: i,
      simulationId,
      success: receipt.status !== 0,
      simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
      gasUsed: receipt.gasUsed,
    })
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)
  }

  // Check final balance is greater than zero
  const balanceResponse = await forkProvider.send('eth_getBalance', [
    treasuryAddress,
    'latest',
  ])
  // True final balance is balance + totalGas - MOCK_BALANCE
  const finalBalance = BigNumber.from(balanceResponse).add(totalGasUsed).sub(MOCK_BALANCE)

  if (finalBalance.lt(constants.Zero)) {
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
