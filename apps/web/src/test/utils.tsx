import { RenderOptions, render } from '@testing-library/react'
import { renderHook, waitFor } from '@testing-library/react'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { SWRConfig } from 'swr'
import { expect } from 'vitest'
import { WagmiConfig, useConnect, useDisconnect } from 'wagmi'

import { config } from './wagmi'

type ProvidersProps = {
  children: React.ReactNode
}

export async function connectAs(user: 'alice' | 'bob' | 'carol') {
  const { result } = renderWagmiHook(useConnect)

  const CONNECTORS = {
    alice: result.current.connectors[0],
    bob: result.current.connectors[1],
    carol: result.current.connectors[2],
  }

  await act(async () => {
    await result.current.connectAsync({
      connector: CONNECTORS[user],
    })
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
}

/**
 * Utility function to disconnect the current user
 */
export async function disconnect() {
  const { result } = renderWagmiHook(useDisconnect)

  await act(result.current.disconnectAsync)
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
}

/**
 * Custom renderHook that wraps the hook in WagmiConfig with the Wagmi test client
 */
export function renderWagmiHook<TResult, TProps>(hook: (props: TProps) => TResult) {
  return renderHook<TResult, TProps>(hook, {
    wrapper: (props) => <WagmiConfig config={config} {...props} />,
  })
}
export function Providers({ children }: ProvidersProps) {
  // render with a clear cache
  // https://swr.vercel.app/docs/advanced/cache#reset-cache-between-test-cases
  return (
    <WagmiConfig config={config}>
      <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
    </WagmiConfig>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options })

export { customRender as render }
