import React from 'react';

import { Box, Typography } from '@mui/material';
import { useBalance, useNetwork, useAccount } from 'wagmi';
import { TokenType } from '../../types';
import { formatAsBalance } from '../../lib/utils/formats';

interface ITokenBalanceInfoProps {
  token: TokenType | null;
}

const TokenBalanceInfo: React.FC<ITokenBalanceInfoProps> = ({ token }) => {
  const { chain } = useNetwork();
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data, isError, isLoading } = useBalance({ address, chainId: chain?.id || 1, ...(token && !token.native ? { token: `0x${token?.address.slice(2)}` } : {}) });
  if (!token || !data || isError || isLoading || isConnecting || isDisconnected) {
    return null;
  }

  return (
    <Box>
      <Typography variant="body2" color="dimgray">
        Balance:
        {`${formatAsBalance(data?.formatted)} ${data?.symbol}`}
      </Typography>
    </Box>
  );
};

export default TokenBalanceInfo;
