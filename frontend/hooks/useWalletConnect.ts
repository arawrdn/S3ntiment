// frontend/hooks/useWalletConnect.ts (Diperbaiki untuk Web3Modal V3)

import { useWeb3ModalAccount, useWeb3ModalProvider, useWeb3Modal } from '@web3modal/ethers/react';
import { BrowserProvider } from 'ethers';

export const useWalletConnect = () => {
    // Hook V3 untuk mendapatkan status koneksi dan alamat
    const { address, isConnected, chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    
    // Hook V3 untuk membuka modal saat tombol diklik
    const { open } = useWeb3Modal();

    let connector: any = null;

    if (isConnected && walletProvider) {
        // walletProvider dari V3 adalah konektor EIP-1193 yang diperlukan oleh useVoteManager
        connector = walletProvider;
    }

    // Fungsi untuk memicu koneksi modal V3
    const connectWallet = async () => {
        // open() dari V3 menggantikan logic V1 createSession & QRCodeModal.open
        await open(); 
    };

    return { 
        walletAddress: address, // address dari V3
        connectWallet,         // fungsi koneksi baru V3
        connector,             // connector baru V3 untuk useVoteManager
        isConnected,           // status koneksi
        chainId,               // chain ID
    };
};
