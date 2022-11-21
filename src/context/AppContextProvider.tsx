import React, { createContext, useState } from 'react';
import { TokenType } from '../types';

type AppContexType = {

  fromToken: TokenType | null;
  toToken: TokenType | null;

  tokenSelectionDialog: {
    open: boolean;
    position: 'from' | 'to' | null;
  },
  showTokenSelectionDialog: (open: boolean, position: 'from' | 'to' | null) => void;
  closeTokenSelectionDialog: () => void;
  tokens: Array<TokenType>;
  setTokens: (tokens: Array<TokenType>) => void;

  setFromToken: (token: TokenType) => void;
  setToToken: (token: TokenType) => void;
};

const defaultValues = {
  fromToken: {
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 5,
    logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
  },
  toToken: null,

  tokenSelectionDialog: {
    open: false,
    position: null,
  },
  showTokenSelectionDialog: () => {},
  closeTokenSelectionDialog: () => {},
  tokens: [],
  setTokens: () => {},
  setFromToken: () => {},
  setToToken: () => {},
};

export const AppContext = createContext<AppContexType>(defaultValues);

interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [fromToken, setFromToken] = useState<TokenType | null>(defaultValues.fromToken);
  const [toToken, setToToken] = useState<TokenType | null>(defaultValues.toToken);
  const [tokenSelectionDialog, setTokenSelectionDialog] = useState<{ open: boolean, position: 'from' | 'to' | null }>(defaultValues.tokenSelectionDialog);
  const [tokens, setTokens] = useState<Array<TokenType>>(defaultValues.tokens);

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
      fromToken,
      toToken,
      tokenSelectionDialog,
      tokens,
      showTokenSelectionDialog,
      closeTokenSelectionDialog,
      setTokens,
      setFromToken,
      setToToken,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
