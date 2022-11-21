export type TokenType = {
  'chainId': number,
  'name': string,
  'symbol': string,
  'decimals': number
  'logoURI': string,
  'address': string,
  native?: boolean,
};

export type SupportedChainIds = [1, 5];
