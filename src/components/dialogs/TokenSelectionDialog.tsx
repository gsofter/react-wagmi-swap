import React, { useMemo } from 'react';
import { useNetwork } from 'wagmi';

import {
  Box, List, ListItemButton, ListItemIcon, ListItemText, Avatar,
} from '@mui/material';

import useAppContext from '../../lib/hooks/useAppContext';
import BasicDialog from './BasicDialog';
import { TokenType } from '../../types';
import uriToHttp from '../../lib/utils/uriToHttp';

const TokenSelectionDialog: React.FC = () => {
  const {
    tokenSelectionDialog, closeTokenSelectionDialog, tokens, setFromToken, setToToken, fromToken, toToken,
  } = useAppContext();
  const { open } = tokenSelectionDialog;
  const { chain } = useNetwork();

  const tokensForChain = useMemo(() => tokens.filter((t) => t.chainId === (chain?.id || 1)) || [], [tokens, chain]);

  const onClickTokenItem = (token: TokenType) => {
    if (tokenSelectionDialog.position === 'from') {
      setFromToken(token);
    } else if (tokenSelectionDialog.position === 'to') {
      setToToken(token);
    }
    closeTokenSelectionDialog();
  };

  const isTokenSelected = (token: TokenType) => {
    if (tokenSelectionDialog.position === 'from') {
      return fromToken?.address === token.address;
    }
    if (tokenSelectionDialog.position === 'to') {
      return toToken?.address === token.address;
    }
    return false;
  };

  const renderDlgContent = () => (
    <Box>
      <Box sx={{ maxHeight: '400px' }}>
        {tokensForChain.map((t) => (
          <List component="nav" aria-label="main mailbox folders" key={`${t.chainId}-${t.address}`}>
            <ListItemButton
              selected={isTokenSelected(t)}
              onClick={() => onClickTokenItem(t)}
            >
              <ListItemIcon>
                <Avatar
                  alt={t.name}
                  src={uriToHttp(t.logoURI)[0]}
                />
              </ListItemIcon>
              <ListItemText primary={t.name} secondary={t.symbol} />
            </ListItemButton>
          </List>
        ))}
      </Box>
    </Box>
  );

  return (
    <BasicDialog
      title="Select Token"
      open={open}
      onClose={closeTokenSelectionDialog}
      content={renderDlgContent()}
    />
  );
};

export default TokenSelectionDialog;
