'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { config } from '@/utils/web3/wagmiConfig'
// import { store } from '@/store/store'
// import { Provider as ReduxProvider } from 'react-redux'

export default function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
