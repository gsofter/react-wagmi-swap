import React from 'react';

import {
  Box, useTheme, Input,
} from '@mui/material';
import TokenSelectButton from './TokenSelectButton';
import useAppContext from '../../lib/hooks/useAppContext';

interface ITokenInputProps {
  position: 'from' | 'to';
  styles?: React.CSSProperties | undefined;
}

const TokenInput: React.FC<ITokenInputProps> = ({
  position,
  styles = {},
}) => {
  const theme = useTheme();

  const { showTokenSelectionDialog, fromToken, toToken } = useAppContext();

  const onClickSelectToken = () => {
    console.log('click');
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
      />
      <TokenSelectButton position={position} token={getToken()} onClick={onClickSelectToken} />
    </Box>
  );
};

export default TokenInput;
