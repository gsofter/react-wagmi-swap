/* eslint-disable import/prefer-default-export */
import { WETH9, Ether } from '@uniswap/sdk-core';
import { TokenType } from '../../types';
import { NATIVE_ETH_LOGO } from '../../constants';

export const getNativeToken = (chainId: number) => {
  const nativeCurrency = Ether.onChain(chainId);

  const nativeToken: TokenType = {
    chainId,
    name: nativeCurrency.name || 'Ether',
    symbol: nativeCurrency.symbol || 'ETH',
    decimals: nativeCurrency.decimals || 18,
    logoURI: NATIVE_ETH_LOGO,
    address: WETH9[chainId].address || '',
    native: true,
  };
  return nativeToken;
};

export const getNativeCurrency = (chainId: number) => Ether.onChain(chainId);
