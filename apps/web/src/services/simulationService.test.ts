import { StaticJsonRpcProvider, TransactionReceipt } from '@ethersproject/providers'
import axios from 'axios'
import { ethers } from 'ethers'
import { vi } from 'vitest'
import { InvalidRequestError } from './errors'
import { InsufficientFundsError, simulate, Simulation } from './simulationService'

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

vi.mock('@ethersproject/providers', () => {
  const StaticJsonRpcProvider = vi.fn()

  StaticJsonRpcProvider.prototype.send = vi.fn()
  StaticJsonRpcProvider.prototype.getTransactionReceipt = vi.fn()

  return { StaticJsonRpcProvider }
})

describe('simulationService', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  describe('simulate', () => {
    const treasuryAddress = '0xbcdfd67cce7bf4f49c0631ddd14eadff4d5ca15d'
    const request = {
      treasuryAddress,
      targets: [
        '0x7d8ba3e0745079b292f68e421d292c05da2d0721',
        '0xa7c8f84ec8cbed6e8fb793904cd1ec9ddfc9c35d',
      ],
      calldatas: ['sendEth()', 'sendEth()'],
      values: ['1', '2'],
    }

    it('fails with mismatched input array lengths', async () => {
      expect(() =>
        simulate({
          treasuryAddress,
          targets: ['t1', 't2', 't3'],
          calldatas: ['c1', 'c2'],
          values: ['v1, v2'],
        })
      ).rejects.toThrow(InvalidRequestError)

      expect(() =>
        simulate({
          treasuryAddress,
          targets: ['t1'],
          calldatas: ['c1'],
          values: ['v1, v2'],
        })
      ).rejects.toThrow(InvalidRequestError)

      expect(() =>
        simulate({
          treasuryAddress,
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
          treasuryAddress: 'nonsense',
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

      const forkProvider = new StaticJsonRpcProvider(
        `https://rpc.tenderly.co/fork/${forkId}`
      )
      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('105', 'ether')
      ) // mock tenderly_addBalance
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: { simulation_fork: { id: forkId } },
      })
      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 1
      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 2
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValue({
        status: 1, // success status
        gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
      } as TransactionReceipt)

      vi.mocked(axios.get).mockResolvedValue({
        status: 200,
        data: { fork: { head_simulation_id: simulationId } },
      })
      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('104', 'ether')
      ) // mock eth_getBalance

      const spy = vi.spyOn(axios, 'delete')

      const response = await simulate(request)

      const expectedSimulations: Simulation[] = [
        {
          index: 0,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
        },
        {
          index: 1,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
        },
      ]

      expect(response).toEqual({
        simulations: expectedSimulations,
        success: true,
        totalGasUsed: ethers.utils.parseUnits('1', 'ether'),
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

      const forkProvider = new StaticJsonRpcProvider(
        `https://rpc.tenderly.co/fork/${forkId}`
      )

      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('105', 'ether')
      ) // mock tenderly_addBalance
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: { simulation_fork: { id: forkId } },
      })

      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 1
      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 2
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        status: 1, // success status
        gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
      } as TransactionReceipt)
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        status: 0, // failed status
        gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
      } as TransactionReceipt)

      vi.mocked(axios.get).mockResolvedValue({
        status: 200,
        data: { fork: { head_simulation_id: simulationId } },
      })
      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('104', 'ether')
      ) // mock eth_getBalance

      const spy = vi.spyOn(axios, 'delete')

      const response = await simulate(request)

      const expectedSimulations: Simulation[] = [
        {
          index: 0,
          simulationId,
          success: true,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
        },
        {
          index: 1,
          simulationId,
          success: false,
          simulationUrl: `https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/fork-simulation/${simulationId}`,
          gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
        },
      ]

      expect(response).toEqual({
        simulations: expectedSimulations,
        success: false,
        totalGasUsed: ethers.utils.parseUnits('1', 'ether'),
      })

      expect(spy).not.toHaveBeenCalled()
    })

    it('returns will throw an InsufficientFunds error if there is not enough eth for transactions', async () => {
      const forkId = 'forkId'
      const simulationId = 'simulationId'

      const forkProvider = new StaticJsonRpcProvider(
        `https://rpc.tenderly.co/fork/${forkId}`
      )

      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('105', 'ether')
      ) // mock tenderly_addBalance
      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: { simulation_fork: { id: forkId } },
      })

      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 1
      vi.mocked(forkProvider.send).mockResolvedValueOnce('txHash') // mock eth_sendTransaction 2
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        status: 1, // success status
        gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
      } as TransactionReceipt)
      vi.mocked(forkProvider.getTransactionReceipt).mockResolvedValueOnce({
        status: 1, // success status
        gasUsed: ethers.utils.parseUnits('0.5', 'ether'),
      } as TransactionReceipt)

      vi.mocked(axios.get).mockResolvedValue({
        status: 200,
        data: { fork: { head_simulation_id: simulationId } },
      })
      vi.mocked(forkProvider.send).mockResolvedValueOnce(
        ethers.utils.parseUnits('94', 'ether')
      ) // mock eth_getBalance

      expect(() => simulate(request)).rejects.toThrow(InsufficientFundsError)
    })
  })
})
