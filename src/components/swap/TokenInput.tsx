import React from 'react';

import {
  Box, useTheme, Input, Stack,
} from '@mui/material';
import TokenSelectButton from './TokenSelectButton';
import TokenBalanceInfo from './TokenBalanceInfo';
import useAppContext from '../../lib/hooks/useAppContext';

interface ITokenInputProps {
  position: 'from' | 'to';
  disableEditing?: boolean;
  showBalanceInfo?: boolean;
  styles?: React.CSSProperties | undefined;
}

const TokenInput: React.FC<ITokenInputProps> = ({
  position,
  styles = {},
  disableEditing = false,
  showBalanceInfo = true,
}) => {
  const theme = useTheme();

  const { showTokenSelectionDialog, fromToken, toToken } = useAppContext();

  const onClickSelectToken = () => {
    showTokenSelectionDialog(true, position);
  };

  const getToken = () => (position === 'from' ? fromToken : toToken);

  return (
    <Box
      maxWidth="lg"
      sx={{
        ...styles,
        border: '1px solid',
        borderColor: theme.palette.text.disabled,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        pl: 2,
        py: 3,
        mb: 1,
      }}
    >
      <Input
        disableUnderline
        sx={{
          flexGrow: 1,
          fontSize: 20,
          fontWeight: 500,
          color: theme.palette.text.primary,
          '&::placeholder': {
            color: theme.palette.text.disabled,
          },
        }}
        type="number"
        placeholder="0.0"
        disabled={disableEditing}
      />
      <Stack direction="column" spacing={1}>
        <TokenSelectButton token={getToken()} onClick={!disableEditing ? onClickSelectToken : () => {}} />
        {showBalanceInfo && <TokenBalanceInfo token={getToken()} />}
      </Stack>
    </Box>
  );
};

export default TokenInput;
