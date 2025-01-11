const NODE_ENV = process.env.NODE_ENV || 'development';
const NEXT_PUBLIC_ASSET_METADATA_NAME =
  process.env.NEXT_PUBLIC_ASSET_METADATA_NAME || 'LEONARDO by Virtuals';
const NEXT_PUBLIC_ASSET_METADATA_SYMBOL =
  process.env.NEXT_PUBLIC_ASSET_METADATA_SYMBOL || 'LEONAI';
const NEXT_PUBLIC_ASSET_METADATA_DECIMALS =
  process.env.NEXT_PUBLIC_ASSET_METADATA_DECIMALS || '18';
const NEXT_PUBLIC_ASSET_SEPOLIA_ADDRESS =
  process.env.NEXT_PUBLIC_ASSET_SEPOLIA_ADDRESS ||
  '0x4c4236Cc1CAFfC09AB830c85C4B2ECFD72239e8A';
const NEXT_PUBLIC_ASSET_BASE_ADDRESS =
  process.env.NEXT_PUBLIC_ASSET_BASE_ADDRESS ||
  '0xb933D4FF5A0e7bFE6AB7Da72b5DCE2259030252f';
const NEXT_PUBLIC_STAKING_SEPOLIA_ADDRESS =
  process.env.NEXT_PUBLIC_STAKING_SEPOLIA_ADDRESS ||
  '0x59E20e8351A7877565427b974406C82f09041E74';
const NEXT_PUBLIC_STAKING_BASE_ADDRESS =
  process.env.NEXT_PUBLIC_STAKING_BASE_ADDRESS || '';
const NEXT_PUBLIC_PONDER_URL =
  process.env.NEXT_PUBLIC_PONDER_URL || 'http://localhost:42069';

let ASSET_ADDRESS = NEXT_PUBLIC_ASSET_SEPOLIA_ADDRESS;
let STAKING_ADDRESS = NEXT_PUBLIC_STAKING_SEPOLIA_ADDRESS;

if (NODE_ENV === 'production') {
  ASSET_ADDRESS = NEXT_PUBLIC_ASSET_BASE_ADDRESS;
  STAKING_ADDRESS = NEXT_PUBLIC_STAKING_BASE_ADDRESS;
}

const ASSET_METADATA_NAME = NEXT_PUBLIC_ASSET_METADATA_NAME;
const ASSET_METADATA_SYMBOL = NEXT_PUBLIC_ASSET_METADATA_SYMBOL;
const ASSET_METADATA_DECIMALS = NEXT_PUBLIC_ASSET_METADATA_DECIMALS;
const PONDER_URL = NEXT_PUBLIC_PONDER_URL;

export {
  NODE_ENV,
  ASSET_METADATA_NAME,
  ASSET_METADATA_SYMBOL,
  ASSET_METADATA_DECIMALS,
  ASSET_ADDRESS,
  STAKING_ADDRESS,
  PONDER_URL,
};
