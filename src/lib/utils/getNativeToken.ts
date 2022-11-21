/* eslint-disable import/prefer-default-export */
import { WETH9 } from '@uniswap/sdk-core';

export const getNativeToken = (chainId: number) => WETH9[chainId];
