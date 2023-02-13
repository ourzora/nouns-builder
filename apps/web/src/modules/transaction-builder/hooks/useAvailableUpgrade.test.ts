import { renderHook, waitFor } from '@testing-library/react'
import { useContractReads } from 'wagmi'
import { vi, expect } from 'vitest'
import { useAvailableUpgrade } from './useAvailableUpgrade'
import { DaoContractAddresses } from 'src/typings'

vi.mock('wagmi', async () => {
  const mod = await vi.importActual<typeof import('wagmi')>('wagmi')
  return {
    ...mod,
    useContractReads: vi.fn(),
  }
})

vi.mock('src/graphql/sdk', async () => {
  const mod = await vi.importActual<typeof import('src/graphql/sdk')>('src/graphql/sdk')
  return {
    ...mod,
    getSdk: vi.fn(() => ({
      proposalsWithCalldata: () => ({ nouns: { nounsProposals: { nodes: [] } } }),
    })),
  }
})

const addresses = {
  governor: '0xbf9BEA8028699F922c3B2879D9CBec0179Bf7587',
  treasury: '0xC093b895c132Eb1BcEA557b231dbf6cE4c7dB8Eb',
  metadata: '0x4aBF2E72EBC38E6BdBd6425A226b03Dc0bb8d18a',
  auction: '0x8F1B054500ED7a2B06619CD2E5D70415Bc9d6b8a',
  token: '0x6e13ED8472fBBd384C260538323906fc1eCb0d7B',
} as DaoContractAddresses

describe('Use available upgrade hook', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should determine no upgrades given a set of undefined addresses', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [
        false,
        '1.1.0',
        {
          governor: '1.0.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '1.1.0',
          token: '1.1.0',
        },
        null,
        null,
        null,
        null,
        null,
      ],
      error: null,
      fetchStatus: 'idle',
      isError: false,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isLoading: false,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'idle',
      internal: undefined as any,
    })

    const { result } = renderHook(() =>
      useAvailableUpgrade({
        governor: undefined,
        treasury: undefined,
        metadata: undefined,
        auction: undefined,
        token: undefined,
      })
    )

    expect(result.current).toStrictEqual({
      shouldUpgrade: false,
      transactions: [],
    })
  })

  it('should determine no upgrades given contract reads loading', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [null, null, null, null, null, null, null, null],
      error: null,
      fetchStatus: 'fetching',
      isError: false,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isLoading: true,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'loading',
      internal: undefined as any,
    })

    const { result } = renderHook(() =>
      useAvailableUpgrade({
        governor: undefined,
        treasury: undefined,
        metadata: undefined,
        auction: undefined,
        token: undefined,
      })
    )

    expect(result.current).toStrictEqual({
      shouldUpgrade: false,
      transactions: [],
    })
  })

  it('should determine no upgrades given an error', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [null, null, null, null, null, null, null, null],
      error: new Error('error'),
      fetchStatus: 'idle',
      isError: true,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isLoading: false,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'error',
      internal: undefined as any,
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    await waitFor(() => expect(result.current).toBeTruthy())

    expect(result.current).toStrictEqual({
      shouldUpgrade: false,
      transactions: [],
    })
  })

  it('should determine no upgrades given all modules are up to date', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [
        false,
        '1.1.0',
        {
          governor: '1.1.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '1.1.0',
          token: '1.1.0',
        },
        '0xe6322201ced0a4d6595968411285a39ccf9d5989',
        '0x9eefef0891b1895af967fe48c5d7d96e984b96a3',
        '0x0b6d2473f54de3f1d80b27c92b22d13050da289a',
        '0x2661fe1a882abfd28ae0c2769a90f327850397c6',
        '0x26f494af990123154e7cc067da7a311b07d54ae1',
      ],
      isLoading: false,
      isError: false,
      error: null,
      fetchStatus: 'fetching',
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'success',
      internal: undefined as any,
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    expect(result.current).toStrictEqual({
      shouldUpgrade: false,
      transactions: [],
    })
  })

  it('should determine no upgrades given no latest version', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [
        false,
        null,
        {
          governor: '1.1.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '1.1.0',
          token: '1.1.0',
        },
        '0xe6322201ced0a4d6595968411285a39ccf9d5989',
        '0x9eefef0891b1895af967fe48c5d7d96e984b96a3',
        '0x0b6d2473f54de3f1d80b27c92b22d13050da289a',
        '0x2661fe1a882abfd28ae0c2769a90f327850397c6',
        '0x26f494af990123154e7cc067da7a311b07d54ae1',
      ],
      isLoading: false,
      isError: false,
      error: null,
      fetchStatus: 'fetching',
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'success',
      internal: undefined as any,
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    expect(result.current).toStrictEqual({
      shouldUpgrade: false,
      transactions: [],
    })
  })

  //TODO: Re-visit with MSW for graphql requests
  it('should determine the available upgrades given some modules out of date', async () => {
    //@ts-ignore
    vi.mocked(useContractReads).mockReturnValue({
      data: [
        false,
        '1.1.0',
        {
          governor: '1.0.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '',
          token: '1.0.0',
        },
        '0xac193e2126f0e7734f2ac8da9d4002935b3c1d75',
        '0x04b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
        '0x935522cf33ae425187aeec69737bd30ab56bd16e',
        '0x5bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
        '0x94d792e07216796cb235e328823199fb8da3c911',
      ],
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    expect(result.current.latest).toBe('1.1.0')
    expect(result.current.totalContractUpgrades).toBe(3)
    expect(result.current.transactions).toStrictEqual([
      {
        name: 'pause()',
        address: addresses.auction,
        calldata: '0x8456cb59',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.governor,
        calldata:
          '0x3659cfe600000000000000000000000004b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.token,
        calldata:
          '0x3659cfe6000000000000000000000000ac193e2126f0e7734f2ac8da9d4002935b3c1d75',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.auction,
        calldata:
          '0x3659cfe60000000000000000000000005bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
      },
      {
        name: 'unpause()',
        address: addresses.auction,
        calldata: '0x3f4ba83a',
      },
    ])
  })

  it('should determine the available upgrades given some modules out of date and auction is currently paused', async () => {
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [
        true,
        '1.1.0',
        {
          governor: '1.0.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '',
          token: '1.0.0',
        },
        '0xac193e2126f0e7734f2ac8da9d4002935b3c1d75',
        '0x04b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
        '0x935522cf33ae425187aeec69737bd30ab56bd16e',
        '0x5bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
        '0x94d792e07216796cb235e328823199fb8da3c911',
      ],
      error: null,
      fetchStatus: 'fetching',
      isError: false,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: false,
      isLoading: false,
      isRefetching: false,
      isSuccess: false,
      refetch: vi.fn(),
      isIdle: false,
      status: 'success',
      internal: undefined as any,
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    expect(result.current.latest).toEqual('1.1.0')
    expect(result.current.totalContractUpgrades).toBe(3)
    expect(result.current.transactions).toStrictEqual([
      {
        name: 'upgradeTo(address)',
        address: addresses.governor,
        calldata:
          '0x3659cfe600000000000000000000000004b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.token,
        calldata:
          '0x3659cfe6000000000000000000000000ac193e2126f0e7734f2ac8da9d4002935b3c1d75',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.auction,
        calldata:
          '0x3659cfe60000000000000000000000005bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
      },
    ])
  })

  it('should determine available upgrades given all modules out of date', async () => {
    //@ts-ignore
    vi.mocked(useContractReads).mockReturnValueOnce({
      data: [
        false,
        '1.1.0',
        {
          governor: '1.0.0',
          treasury: '1.0.0',
          metadata: '1.0.0',
          auction: '1.0.0',
          token: '1.0.0',
        },
        '0xac193e2126f0e7734f2ac8da9d4002935b3c1d75',
        '0x04b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
        '0x935522cf33ae425187aeec69737bd30ab56bd16e',
        '0x5bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
        '0x94d792e07216796cb235e328823199fb8da3c911',
      ],
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses))

    expect(result.current.latest).toEqual('1.1.0')
    expect(result.current.totalContractUpgrades).toBe(5)
    expect(result.current.transactions).toStrictEqual([
      {
        name: 'pause()',
        address: addresses.auction,
        calldata: '0x8456cb59',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.governor,
        calldata:
          '0x3659cfe600000000000000000000000004b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.token,
        calldata:
          '0x3659cfe6000000000000000000000000ac193e2126f0e7734f2ac8da9d4002935b3c1d75',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.treasury,
        calldata:
          '0x3659cfe6000000000000000000000000935522cf33ae425187aeec69737bd30ab56bd16e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.auction,
        calldata:
          '0x3659cfe60000000000000000000000005bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.metadata,
        calldata:
          '0x3659cfe600000000000000000000000094d792e07216796cb235e328823199fb8da3c911',
      },
      {
        name: 'unpause()',
        address: addresses.auction,
        calldata: '0x3f4ba83a',
      },
    ])
  })

  it('should determine no upgrades required given provided version is met', () => {
    //@ts-ignore
    vi.mocked(useContractReads).mockReturnValue({
      data: [
        false,
        '1.2.0',
        {
          governor: '1.1.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '1.1.0',
          token: '1.1.0',
        },
        '0xac193e2126f0e7734f2ac8da9d4002935b3c1d75',
        '0x04b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
        '0x935522cf33ae425187aeec69737bd30ab56bd16e',
        '0x5bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
        '0x94d792e07216796cb235e328823199fb8da3c911',
      ],
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses, '1.1.0'))

    expect(result.current.shouldUpgrade).toBe(false)
    expect(result.current.transactions).toHaveLength(0)
  })

  it('should determine upgrades to latest version given contract does not meet the provided version', async () => {
    //@ts-ignore
    vi.mocked(useContractReads).mockReturnValue({
      data: [
        false,
        '1.2.0',
        {
          governor: '1.0.0',
          treasury: '1.1.0',
          metadata: '1.1.0',
          auction: '1.1.0',
          token: '1.0.0',
        },
        '0xac193e2126f0e7734f2ac8da9d4002935b3c1d75',
        '0x04b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
        '0x935522cf33ae425187aeec69737bd30ab56bd16e',
        '0x5bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
        '0x94d792e07216796cb235e328823199fb8da3c911',
      ],
    })

    const { result } = renderHook(() => useAvailableUpgrade(addresses, '1.1.0'))

    expect(result.current.latest).toBe('1.2.0')
    expect(result.current.totalContractUpgrades).toBe(5)
    expect(result.current.transactions).toStrictEqual([
      {
        name: 'pause()',
        address: addresses.auction,
        calldata: '0x8456cb59',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.governor,
        calldata:
          '0x3659cfe600000000000000000000000004b2c0ea4ea3e9c92f0555fd0fb9c9564e25c52e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.token,
        calldata:
          '0x3659cfe6000000000000000000000000ac193e2126f0e7734f2ac8da9d4002935b3c1d75',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.treasury,
        calldata:
          '0x3659cfe6000000000000000000000000935522cf33ae425187aeec69737bd30ab56bd16e',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.auction,
        calldata:
          '0x3659cfe60000000000000000000000005bde6cf41cd7aa5b6e522ffa491f1bf6c6607bd3',
      },
      {
        name: 'upgradeTo(address)',
        address: addresses.metadata,
        calldata:
          '0x3659cfe600000000000000000000000094d792e07216796cb235e328823199fb8da3c911',
      },
      {
        name: 'unpause()',
        address: addresses.auction,
        calldata: '0x3f4ba83a',
      },
    ])
  })
})
