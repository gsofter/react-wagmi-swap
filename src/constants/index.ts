/* eslint-disable import/prefer-default-export */
export const UNI_LIST = 'https://tokens.uniswap.org';

export const NATIVE_ETH_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png';

export const networks = [1, 5];

export const ChainIds = {
  MAINNET: 1,
  GOERLI: 5,
};

export type ChainIdType = 1 | 5;

export const routerAddress = new Map();
routerAddress.set(ChainIds.MAINNET, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
routerAddress.set(ChainIds.GOERLI, '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
