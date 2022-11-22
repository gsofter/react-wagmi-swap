import React, { createContext, useState } from 'react';
import { TokenType } from '../types';

type AppContexType = {
  fromToken: TokenType | null;
  toToken: TokenType | null;
  amountFrom: string;
  amountTo: string;
  tokenSelectionDialog: {
    open: boolean;
    position: 'from' | 'to' | null;
  },
  showTokenSelectionDialog: (open: boolean, position: 'from' | 'to' | null) => void;
  closeTokenSelectionDialog: () => void;
  tokens: Array<TokenType>;
  setTokens: (tokens: Array<TokenType>) => void;
  setFromToken: (token: TokenType | null) => void;
  setToToken: (token: TokenType | null) => void;
  setAmountFrom: (amount: string) => void;
  setAmountTo: (amount: string) => void;
};

const defaultValues = {
  fromToken: {
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 5,
    logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
    native: false,
  },
  toToken: null,
  amountFrom: '0.0',
  amountTo: '0.0',

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
  setAmountFrom: () => {},
  setAmountTo: () => {},
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
  const [amountFrom, setAmountFrom] = useState<string>(defaultValues.amountFrom);
  const [amountTo, setAmountTo] = useState<string>(defaultValues.amountTo);
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

  const handleSetFromToken = (token: TokenType | null) => {
    // check if token is selected as toToken
    if (token && toToken?.address === token.address && toToken?.native === token.native) {
      setToToken(fromToken);
      setFromToken(token);
    }
    setFromToken(token);
  };

  const handleSetToToken = (token: TokenType | null) => {
    // check if token is selected as fromToken
    if (token && fromToken?.address === token?.address && fromToken?.native === token?.native) {
      setFromToken(toToken);
    }
    setToToken(token);
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
      setFromToken: handleSetFromToken,
      setToToken: handleSetToToken,
      amountFrom,
      amountTo,
      setAmountFrom,
      setAmountTo,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
