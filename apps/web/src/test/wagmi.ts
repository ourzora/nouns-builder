import { Wallet as RainbowkitWallet, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { createWalletClient, http } from 'viem'
import { configureChains, createConfig } from 'wagmi'
import { foundry } from 'wagmi/chains'
import { MockConnector } from 'wagmi/connectors/mock'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const ANVIL_URL = foundry.rpcUrls.default.http[0]

export const TEST_WALLETS: RainbowkitWallet[] = [
  {
    id: 'alice',
    name: 'Alice',
    iconUrl: '',
    iconBackground: 'red',
    createConnector: makeCreateConnectorFor(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    ),
  },
  {
    id: 'bob',
    name: 'Bob',
    iconUrl: '',
    iconBackground: 'blue',
    createConnector: makeCreateConnectorFor(
      '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
    ),
  },
  {
    id: 'carol',
    name: 'Carol',
    iconUrl: '',
    iconBackground: 'yellow',
    createConnector: makeCreateConnectorFor(
      '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a'
    ),
  },
]

function makeCreateConnectorFor(address: `0x${string}`) {
  return () => ({
    connector: new MockConnector({
      chains: [foundry],
      options: {
        walletClient: createWalletClient({
          account: address,
          transport: http(ANVIL_URL),
        }),
      },
    }),
  })
}

export const { publicClient, webSocketPublicClient, chains } = configureChains(
  [foundry],
  [jsonRpcProvider({ rpc: () => ({ http: ANVIL_URL }) })]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Test wallets',
    wallets: TEST_WALLETS,
  },
])

export const config = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors,
})
