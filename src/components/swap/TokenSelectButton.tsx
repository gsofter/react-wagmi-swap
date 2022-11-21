import React from 'react';

import { Button, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TokenType } from '../../types';
import uriToHttp from '../../lib/utils/uriToHttp';

interface ITokenSelectButtonProps {
  position: 'from' | 'to';
  token: TokenType | null;
  onClick: () => void;
}

const TokenAvatar = ({ token }: { token: TokenType }) => (
  <Avatar
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
  onClick,
}) => {
  if (!token) {
    return (
      <Button
        variant="contained"
        sx={{
          width: 'auto', borderRadius: '50px',
        }}
        onClick={onClick}
      >
        Select Token
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      sx={{
        width: 'auto', maxWidth: 'auto', borderRadius: '50px',
      }}
      startIcon={<TokenAvatar token={token} />}
      endIcon={<KeyboardArrowDownIcon />}
      onClick={onClick}
    >
      {token.symbol}
    </Button>
  );
};

export default TokenSelectButton;
