import { ethers } from 'ethers';

export const formatEther = (value: string | number | ethers.BigNumber) => ethers.utils.formatEther(value);

export const formatAsBalance = (value: string) => parseFloat(value).toFixed(4);
