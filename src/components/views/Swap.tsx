import React, { useEffect, useState } from 'react';

import {
  Paper, Container, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import {
  useAccount, useNetwork, useSigner, useBalance,
} from 'wagmi';
import TokenInput from '../swap/TokenInput';
import TokenSelectionDialog from '../dialogs/TokenSelectionDialog';
import SwapConfirmDialog from '../dialogs/SwapConfirmDialog';
import { UNI_LIST } from '../../constants';
import useAppContext from '../../lib/hooks/useAppContext';
import { getNativeToken } from '../../lib/utils/getNativeToken';
import { TokenType } from '../../types';
import { fetchPrice, getRouterContract, swapTokens } from '../../lib/utils/trade';

const SwapCard: React.FC = () => {
  const {
    setTokens, fromToken, toToken, setFromToken, setToToken, amountFrom,
  } = useAppContext();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: fromBalanceData } = useBalance({ address, ...(fromToken && !fromToken.native ? { token: `0x${fromToken?.address.slice(2)}` } : {}) });
  const { data: signer } = useSigner();

  const [price, setPrice] = useState<string>('');
  const [openSwapConfirmDlg, setOpenSwapConfirmDlg] = useState<boolean>(false);

  const initializeTokens = async () => {
    const response = await axios.get(UNI_LIST);

    const chainId = chain?.id || 1;

    const tokens = response.data.tokens.filter((token: TokenType) => token.chainId === chainId)
      .map((token: TokenType) => ({
        ...token,
        native: false,
      }));

    // add native token to first
    tokens.unshift(getNativeToken(chainId));
    setTokens(tokens);
    setFromToken(getNativeToken(chainId));
    setToToken(null);
  };

  const fetchTokenPrice = async () => {
    if (fromToken && toToken) {
      fetchPrice({
        from: fromToken, to: toToken, amount: 1, chainId: chain?.id || 1,
      }).then((res) => {
        setPrice(res);
      });
    }
  };

  useEffect(() => {
    initializeTokens();
  }, [chain?.id]);

  useEffect(() => {
    if (isConnected && fromToken && toToken) {
      fetchTokenPrice();
    }
  }, [fromToken, toToken, isConnected]);

  const handleClickSwap = () => {
    // show swap confirm dialog
    setOpenSwapConfirmDlg(true);
  };

  const renderSwapButton = () => {
    let btnDisabled = false;
    let btnTxt = 'Swap';
    if (!isConnected) {
      btnDisabled = true;
      btnTxt = 'Connect Wallet';
    } else if (!fromToken || !toToken) {
      btnDisabled = true;
      btnTxt = 'Select Tokens';
    } else if (fromBalanceData?.formatted && parseFloat(amountFrom) > parseFloat(fromBalanceData?.formatted)) {
      btnDisabled = true;
      btnTxt = 'Insufficient Balance';
    }

    return (
      <Button
        variant="contained"
        sx={{ width: '100%', mt: 2 }}
        disabled={btnDisabled}
        onClick={handleClickSwap}
      >
        {btnTxt}
      </Button>
    );
  };

  const renderPriceInfo = () => {
    if (!fromToken || !toToken) {
      return null;
    }

    return (
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
        {`1 ${fromToken.symbol} = ${price} ${toToken.symbol}`}
      </Typography>
    );
  };

  const onClickConfirm = () => {
    if (!signer || !address || !fromToken || !toToken) return;
    const routerContract = getRouterContract(chain?.id || 1, signer);
    swapTokens(fromToken, toToken, 1, routerContract, address, signer);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ px: 2, py: 2, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Swap
        </Typography>
        <TokenInput position="from" />
        <TokenInput position="to" />
        {renderSwapButton()}
        {renderPriceInfo()}
      </Paper>
      <TokenSelectionDialog />
      <SwapConfirmDialog open={openSwapConfirmDlg} onClose={() => setOpenSwapConfirmDlg(false)} onOk={onClickConfirm} />
    </Container>
  );
};

export default SwapCard;
