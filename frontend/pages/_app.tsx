// pages/_app.tsx

import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// --- BAGIAN INISIALISASI WEB3MODAL (Perlu berjalan di sisi klien saja) ---
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
// import '../styles/globals.css'; // Pastikan Anda mengimpor CSS global Anda

// 1. Definisikan Project ID dan Jaringan
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const arbitrumSepolia = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.arbiscan.io/',
  rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
};

const metadata = {
  name: 'S3ntiment Voting App',
  description: 'Decentralized voting platform',
  url: 'https://s3ntiment.vercel.app/', 
  icons: ['https://avatars.githubusercontent.com/u/37784886'] 
};

const chains = [arbitrumSepolia];
const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: 421614,
  rpcUrl: arbitrumSepolia.rpcUrl
});

// Fungsi inisialisasi
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

// Komponen Pembungkus yang Menginisialisasi Modal
const Web3ModalInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Inisialisasi modal HANYA di sisi klien (setelah DOM siap)
    useEffect(() => {
        modalInit();
    }, []);

    return <>{children}</>;
};

// --- BAGIAN APLIKASI NEXT.JS UTAMA ---

function MyApp({ Component, pageProps }: AppProps) {
  // Pembungkus ini memastikan Web3Modal diinisialisasi hanya sekali
  return (
    <Web3ModalInitializer>
      <Component {...pageProps} />
    </Web3ModalInitializer>
  );
}

export default MyApp;
