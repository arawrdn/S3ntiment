// Ganti file tempat Anda menginisialisasi Web3Modal
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
// Anda mungkin juga perlu mengimpor BrowserProvider atau sejenisnya dari 'ethers'

// 1. Project ID Anda
const projectId = '9d223614796ed232ccb4903dce656eab'; // Project ID Anda

// 2. Definisi Rantai (Chains)
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

// Daftar semua rantai yang didukung
const chains = [base, celo]; 

// 3. Metadata Proyek
const metadata = defaultConfig({
  name: 'S3ntiment',
  description: 'Aplikasi Sentimen Base & Celo',
  url: 'https://s3ntiment.vercel.app', // Ganti dengan URL Anda
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
});

// 4. Konfigurasi Ethers
const ethersConfig = {
  metadata,
  enableEIP6963: true,
  defaultChainId: 8453, // Atur default ke Base
  rpcUrl: base.rpcUrl, 
};

// 5. Inisialisasi Modal
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
});

// Anda bisa membuat komponen Provider React untuk membungkus root aplikasi
export default function Web3ModalProvider({ children }) {
  // Hanya perlu me-return children karena createWeb3Modal sudah mengurus inisialisasi global
  return children;
}

/*
PENTING: Pastikan komponen ini dibungkus di file _app.js atau root file 
lainnya sehingga inisialisasi modal terjadi sekali.
*/
