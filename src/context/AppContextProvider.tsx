import React, { createContext, useState } from 'react';
import { useNetwork, useSigner } from 'wagmi';
import { getAmountIn, getAmountOut, getRouterContract } from '../lib/utils/trade';
import { TokenType } from '../types';
import { formatAsBalance } from '../lib/utils/formats';

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
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  const closeTokenSelectionDialog = () => {
    setTokenSelectionDialog({
      open: false,
      position: null,
    });
  };

  const handleSetFromToken = (token: TokenType | null) => {
    // check if token is selected as toToken, then exchange fromToken and toToken
    if (token && toToken?.address === token.address && toToken?.native === token.native) {
      setToToken(fromToken);
      const tmp = amountFrom;
      setAmountFrom(amountTo);
      setAmountTo(tmp);
    }

    setFromToken(token);
  };

  const handleSetToToken = (token: TokenType | null) => {
    // check if token is selected as fromToken, then exchange fromToken and toToken
    if (token && fromToken?.address === token?.address && fromToken?.native === token?.native) {
      setFromToken(toToken);
      const tmp = amountFrom;
      setAmountFrom(amountTo);
      setAmountTo(tmp);
    }
    setToToken(token);
  };

  const handeSetAmountFrom = async (val: string) => {
    setAmountFrom(val);
    if (chain?.id === undefined || !signer) {
      setAmountTo(defaultValues.amountTo);
      return;
    }
    const routerContract = getRouterContract(chain?.id, signer);
    if (fromToken && toToken) {
      const amountOutVal = await getAmountOut(fromToken, toToken, val, routerContract);
      if (typeof amountOutVal === 'string') { setAmountTo(formatAsBalance(amountOutVal)); }
    }
  };

  const handleSetAmountTo = async (val: string) => {
    setAmountTo(val);
    if (chain?.id === undefined || !signer) {
      setAmountFrom(defaultValues.amountFrom);
      return;
    }
    const routerContract = getRouterContract(chain?.id, signer);
    if (fromToken && toToken) {
      const amountInVal = await getAmountIn(fromToken, toToken, val, routerContract);
      if (typeof amountInVal === 'string') { setAmountFrom(formatAsBalance(amountInVal)); }
    }
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
      setAmountFrom: handeSetAmountFrom,
      setAmountTo: handleSetAmountTo,
    }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
