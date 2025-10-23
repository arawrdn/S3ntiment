import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import type { AppProps } from 'next/app';
// Catatan: Impor CSS ini dinonaktifkan sementara. Aktifkan kembali jika build Vercel sudah berhasil.
// import '../styles/globals.css'; 

// 1. Project ID (Mengambil dari Environment Variable NEXT_PUBLIC_PROJECT_ID)
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; 

if (!projectId) {
  console.error("NEXT_PUBLIC_PROJECT_ID tidak diatur. WalletConnect tidak akan berfungsi.");
}

// 2. Definisi Rantai (Chains): Base dan Celo
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

const chains = [base, celo]; 

// 3. Metadata Proyek
const metadata = defaultConfig({
  name: 'S3ntiment',
  description: 'Aplikasi Sentimen Base & Celo',
  url: 'https://s3ntiment.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
});

// 4. Konfigurasi Ethers
const ethersConfig = {
  metadata,
  enableEIP6963: true,
  defaultChainId: 8453, // Default ke Base
  rpcUrl: base.rpcUrl, 
};

// Inisialisasi Modal (Hanya berjalan di sisi klien)
if (typeof window !== 'undefined' && projectId) {
  createWeb3Modal({
    ethersConfig,
    chains,
    projectId,
    enableAnalytics: true,
  });
}

// Komponen Root Next.js
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
