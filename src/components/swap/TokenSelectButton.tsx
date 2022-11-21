import React from 'react';

import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TokenType } from '../../types';
import uriToHttp from '../../utils/uriToHttp';

interface ITokenSelectButtonProps {
  position: 'from' | 'to';
  token: TokenType
}

const TokenAvatar = ({ token }: { token: TokenType }) => (
  <img
    src={uriToHttp(token.logoURI)[0]}
    alt={token.symbol}
    style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
    }}
  />
);

const TokenSelectButton: React.FC<ITokenSelectButtonProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  position,
  token,
}) => (
  <Button
    variant="contained"
    sx={{
      width: '100%', mt: 2, maxWidth: '100px', borderRadius: '50px',
    }}
    startIcon={<TokenAvatar token={token} />}
    endIcon={<KeyboardArrowDownIcon />}
  >
    {token.symbol}
  </Button>
);

export default TokenSelectButton;
