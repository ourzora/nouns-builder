import axios from 'axios'
import { Address, TransactionReceipt, parseEther } from 'viem'
import { vi } from 'vitest'

import { CHAIN_ID } from 'src/typings'

import { createClient } from './createClient'
import { InvalidRequestError } from './errors'
import { Simulation, simulate } from './simulationService'

const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY } = process.env

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    },
  }
})

vi.mock('./createClient', async () => {
  return {
    createClient: vi.fn().mockReturnValue({
      getBalance: vi.fn(),
      sendTransaction: vi.fn(),
      getTransactionReceipt: vi.fn(),
      request: vi.fn(),
    }),
  }
})

describe('simulationService', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  describe('simulate', () => {
    const treasuryAddress: Address = '0xbcdfd67cce7bf4f49c0631ddd14eadff4d5ca15d'
    const request = {
      treasuryAddress,
      chainId: CHAIN_ID.ETHEREUM,
      targets: [
        '0x7d8ba3e0745079b292f68e421d292c05da2d0721',
        '0xa7c8f84ec8cbed6e8fb793904cd1ec9ddfc9c35d',
      ],
      calldatas: ['sendEth()', 'sendEth()'],
      values: ['1', '2'],
    }

    const receipt = {
      status: 'success', // success status
      gasUsed: parseEther('0.5'),
      blockHash: '0x123',
      blockNumber: 0n,
      cumulativeGasUsed: 0n,
      effectiveGasPrice: 0n,
      from: '0x123',
      logs: [],
      logsBloom: '0x123',
      to: '0x123',
      transactionHash: '0x123',
      transactionIndex: 0,
      type: 'eip1559',
      contractAddress: '0x123',
    } as TransactionReceipt

    it('fails with mismatched input array lengths', async () => {
      expect(() =>
        simulate({
          treasuryAddress,
          chainId: CHAIN_ID.ETHEREUM,
          targets: ['t1', 't2', 't3'],
          calldatas: ['c1', 'c2'],
          values: ['v1, v2'],
        })
      ).rejects.toThrow(InvalidRequestError)

      expect(() =>
        simulate({
          treasuryAddress,
          chainId: CHAIN_ID.ETHEREUM,
          targets: ['t1'],
          calldatas: ['c1'],
          values: ['v1, v2'],
        })
      ).rejects.toThrow(InvalidRequestError)

      expect(() =>
        simulate({
          treasuryAddress,
          chainId: CHAIN_ID.ETHEREUM,
          targets: ['t1'],
          calldatas: ['c1', 'c2'],
          values: ['v1, v2'],
        })
      ).rejects.toThrow(InvalidRequestError)
    })

    it('fails with invalid treasury address', async () => {
      expect(() =>
        simulate({
          ...request,
          treasuryAddress: '0xnonsense',
        })
      ).rejects.toThrow(InvalidRequestError)
    })

    it('fails with invalid target address', async () => {
      expect(() =>
        simulate({
          ...request,
          targets: ['nonsense1', '0xa7c8f84ec8cbed6e8fb793904cd1ec9ddfc9c35d'],
        })
      ).rejects.toThrow(InvalidRequestError)
    })

    it('returns succeeded simulations', async () => {
      const forkId = 'forkId'
      const simulationId = 'simulationId'

      const forkProvider = createClient(forkId, CHAIN_ID.ETHEREUM)

      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: { simulation_fork: { id: forkId } },
      })
      vi.mocked(forkProvider.request).mockResolvedValueOnce('0xHash') // mock eth_sendTransaction 1
      vi.mocked(forkProvider.request).mockResolvedValueOnce('0xHash') // mock eth_sendTransaction 2
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValue({
        ...receipt,
        status: 'success', // success status
        gasUsed: parseEther('0.5'),
      })

      vi.mocked(axios.get).mockResolvedValue({
        status: 200,
        data: { fork: { head_simulation_id: simulationId } },
      })
      vi.mocked(forkProvider.getBalance).mockResolvedValueOnce(parseEther('104')) // mock eth_getBalance

      const spy = vi.spyOn(axios, 'delete')

      const response = await simulate(request)

      const expectedSimulations: Simulation[] = [
        {
          index: 0,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: parseEther('0.5'),
        },
        {
          index: 1,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: parseEther('0.5'),
        },
      ]

      expect(response).toEqual({
        simulations: expectedSimulations,
        success: true,
        totalGasUsed: parseEther('1'),
      })

      expect(spy).toHaveBeenCalledOnce()
      expect(spy).toHaveBeenCalledWith(
        `https://api.tenderly.co/api/v2/project/nouns-builder-public/forks/${forkId}`,
        { headers: { 'X-Access-Key': TENDERLY_ACCESS_KEY as string } }
      )
    })

    it('returns simulations with an error', async () => {
      const forkId = 'forkId'
      const simulationId = 'simulationId'

      const forkProvider = createClient(forkId, CHAIN_ID.ETHEREUM)

      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: { simulation_fork: { id: forkId } },
      })

      vi.mocked(forkProvider.request).mockResolvedValueOnce('0xHash') // mock eth_sendTransaction 1
      vi.mocked(forkProvider.request).mockResolvedValueOnce('0xHash') // mock eth_sendTransaction 2
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        ...receipt,
        status: 'success', // success status
        gasUsed: parseEther('0.5'),
      })
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        ...receipt,
        status: 'reverted', // failed status
        gasUsed: parseEther('0.5'),
      })

      vi.mocked(axios.get).mockResolvedValue({
        status: 200,
        data: { fork: { head_simulation_id: simulationId } },
      })
      vi.mocked(forkProvider.getBalance).mockResolvedValueOnce(parseEther('104')) // mock eth_getBalance

      const spy = vi.spyOn(axios, 'delete')

      const response = await simulate(request)

      const expectedSimulations: Simulation[] = [
        {
          index: 0,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: parseEther('0.5'),
        },
        {
          index: 1,
          simulationId,
          success: false,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: parseEther('0.5'),
        },
      ]

      expect(response).toEqual({
        simulations: expectedSimulations,
        success: false,
        totalGasUsed: parseEther('1'),
      })

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
