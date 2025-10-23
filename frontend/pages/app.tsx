import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import type { AppProps } from 'next/app';
// Note: CSS import is commented out as it might cause resolution errors in the build environment.
// import '../styles/globals.css'; 

// 1. Project ID (Retrieved from Next.js Environment Variable)
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; 

if (!projectId) {
  console.error("NEXT_PUBLIC_PROJECT_ID is not set. WalletConnect will not function.");
}

// 2. Define Metadata (Global Sentiment Description)
const metadata = {
  name: 'S3ntiment',
  description: 'Connect to S3ntiment: Global Crypto Sentiment Analysis Platform.', 
  url: 'https://s3ntiment.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// 3. Chain Definitions: BASE and CELO
const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org',
};

const celo = {
  chainId: 42220,
  name: 'Celo',
  currency: 'CELO',
  explorerUrl: 'https://celoscan.io',
  rpcUrl: 'https://forno.celo.org',
};

// Only include Base and Celo
const chains = [base, celo]; 

// 4. Ethers Configuration
const ethersConfig = defaultConfig({
  metadata: metadata,
  enableEIP6963: true,
  defaultChainId: 8453, // Default to Base
  rpcUrl: base.rpcUrl, 
});

// Initialize Modal (Runs only once on the client-side)
if (typeof window !== 'undefined' && projectId) {
  createWeb3Modal({
    ethersConfig,
    chains,
    projectId,
    enableAnalytics: true,
  });
}

// Next.js Root Component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
