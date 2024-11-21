import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygon } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors'

const projectId = '51896d8dc0249f156109e359c3ff6b59'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon],
  connectors: [
    metaMask(),
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
})
