# BloxSwap

[Live Demo](https://bloxroute-swap.netlify.app/)
![image](https://user-images.githubusercontent.com/49583931/203301772-71c78eec-2b3e-457a-8da3-60b83a4dcc1f.png)

>NOTE: BloxSwap will work for Ether mainnet and Goerli testnet.

## Technical Stacks
- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Built with [Typescript](https://www.typescriptlang.org/)
- [Ethers](https://docs.ethers.io/v5/)
- [Wagmi](https://wagmi.sh/docs/getting-started/)
- [Material UI](https://mui.com/)

## Core utils function

```typescript
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
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
