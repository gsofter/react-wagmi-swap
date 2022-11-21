import {
  Token, Fetcher, Trade, Route, TokenAmount, TradeType,
} from '@uniswap/sdk';
import { ethers, Contract } from 'ethers';
import { TokenType } from '../../types';
import { routerAddress } from '../../constants';
import ERC20 from '../abis/ERC20.json';
import ROUTER from '../abis/UniswapV2Router.json';

export const fetchPrice = async ({
  from, to, amount, chainId,
}: {
  from: TokenType;
  to: TokenType;
  amount: number;
  chainId: number;
}) => {
  const fromToken = new Token(chainId, from.address, from.decimals);
  const toToken = new Token(chainId, to.address, to.decimals);

  // note that you may want/need to handle this async code differently,
  // for example if top-level await is not an option
  const pair = await Fetcher.fetchPairData(fromToken, toToken);

  const route = new Route([pair], fromToken);

  const trade = new Trade(
    route,
    new TokenAmount(fromToken, ethers.utils.parseEther(amount.toString()).toString()),
    TradeType.EXACT_INPUT,
  );

  return trade.executionPrice.toSignificant(6);
};

export function getRouterContract(chainId: number, signer: ethers.Signer) {
  const routerContractAddress = routerAddress.get(chainId);
  return new Contract(routerContractAddress, ROUTER.abi, signer);
}

export const swapTokens = async (
  from: TokenType,
  to: TokenType,
  amount: number | string,
  routerContract: Contract,
  accountAddress: string,
  signer: ethers.Signer,
) => {
  const tokens = [from.address, to.address];
  const time = Math.floor(Date.now() / 1000) + 200000;
  const deadline = ethers.BigNumber.from(time);

  const token1 = new Contract(from.address, ERC20.abi, signer);
  const tokenDecimals = from.decimals;

  const amountIn = ethers.utils.parseUnits(typeof amount === 'number' ? amount.toString() : amount, tokenDecimals);
  const amountOut = await routerContract.callStatic.getAmountsOut(
    amountIn,
    tokens,
  );

  await token1.approve(routerContract.address, amountIn);
  const wethAddress = await routerContract.WETH();

  if (from.address === wethAddress) {
    // Eth -> Token
    await routerContract.swapExactETHForTokens(
      amountOut[1],
      tokens,
      accountAddress,
      deadline,
      { value: amountIn },
    );
  } else if (to.address === wethAddress) {
    // Token -> Eth
    await routerContract.swapExactTokensForETH(
      amountIn,
      amountOut[1],
      tokens,
      accountAddress,
      deadline,
    );
  } else {
    await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOut[1],
      tokens,
      accountAddress,
      deadline,
    );
  }
};
