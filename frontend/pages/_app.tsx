// pages/_app.tsx

import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
// import '../styles/globals.css'; // Jangan lupa uncomment jika Anda menggunakan global CSS

// --- KONFIGURASI JARINGAN BASE DAN CELO (MAINNET) ---
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

// 1. Konfigurasi Base Mainnet
const baseMainnet = {
  chainId: 8453,
  name: 'Base Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://base.blockscout.com/',
  rpcUrl: 'https://mainnet.base.org', 
};

// 2. Konfigurasi Celo Mainnet
const celoMainnet = {
  chainId: 42220,
  name: 'Celo Mainnet',
  currency: 'CELO',
  explorerUrl: 'https://celoscan.io',
  rpcUrl: 'https://forno.celo.org',
};

// 3. Metadata aplikasi (Sama seperti sebelumnya)
const metadata = {
  name: 'S3ntiment Voting App',
  description: 'Decentralized voting platform',
  url: 'https://s3ntiment.vercel.app/', 
  icons: ['https://avatars.githubusercontent.com/u/37784886'] 
};

// Daftarkan kedua chain
const chains = [baseMainnet, celoMainnet];

// Atur Base sebagai chain default
const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 8453, // Default ke Base
  rpcUrl: baseMainnet.rpcUrl
});


// --- INISIALISASI WEB3MODAL ---

const modalInit = () => {
  if (projectId) {
      createWeb3Modal({
          ethersConfig,
          chains,
          projectId,
          enableAnalytics: true, 
          enableOnramp: true, 
      });
  } else {
      console.error("WalletConnect Project ID is missing.");
  }
}

// Komponen Pembungkus yang Menginisialisasi Modal HANYA di sisi klien (untuk mencegah crash SSR)
const Web3ModalInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        modalInit();
    }, []);
    return <>{children}</>;
};

// --- APLIKASI UTAMA ---

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ModalInitializer>
      <Component {...pageProps} />
    </Web3ModalInitializer>
  );
}

export default MyApp;
