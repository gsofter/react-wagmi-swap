import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';

import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { ConnectKitProvider } from 'connectkit';

import Profile from './components/Profile';
import MainLayout from './layouts/MainLayout';

// Configure chains & providers with the Infura provider
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: process.env.REACT_APP_INFURA_API_KEY || '' }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export default function App() {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <MainLayout>
          <Profile />
        </MainLayout>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
