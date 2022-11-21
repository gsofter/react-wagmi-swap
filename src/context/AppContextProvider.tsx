import React, { createContext, useState } from 'react';
import { TokenType } from '../types';

type AppContexType = {
  swap: {
    from: TokenType | null;
    to: TokenType | null;
  },
  tokenSelectionDialog: {
    open: boolean;
    position: 'from' | 'to' | null;
  },
  showTokenSelectionDialog: (open: boolean, position: 'from' | 'to' | null) => void;
  closeTokenSelectionDialog: () => void;
};

const defaultValues = {
  swap: {
    from: {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 5,
      logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
    },
    to: null,
  },
  tokenSelectionDialog: {
    open: false,
    position: null,
  },
  showTokenSelectionDialog: () => {},
  closeTokenSelectionDialog: () => {},
};

export const AppContext = createContext<AppContexType>(defaultValues);

interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [swap] = useState(defaultValues.swap);
  const [tokenSelectionDialog, setTokenSelectionDialog] = useState<{ open: boolean, position: 'from' | 'to' | null }>(defaultValues.tokenSelectionDialog);

  const showTokenSelectionDialog = (open: boolean, position: 'from' | 'to' | null = null) => {
    setTokenSelectionDialog({
      open,
      position,
    });
  };

  const closeTokenSelectionDialog = () => {
    setTokenSelectionDialog({
      open: false,
      position: null,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{
      swap, tokenSelectionDialog, showTokenSelectionDialog, closeTokenSelectionDialog,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
