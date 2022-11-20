import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

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

import MainLayout from './layouts/MainLayout';
import AppContextProvider from './context/AppContextProvider';
import PageNotFound from './components/PageNotFound';
import SwapCard from './components/swap/Swap';

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
    <BrowserRouter>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <AppContextProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/swap" />} />
                <Route path="/swap" element={<SwapCard />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </MainLayout>
          </AppContextProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  );
}
