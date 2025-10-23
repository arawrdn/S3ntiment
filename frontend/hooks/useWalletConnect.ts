// frontend/hooks/useWalletConnect.ts

import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Signer } from "ethers";
import { useCallback, useMemo } from "react";

// Definisikan tipe untuk memudahkan pemahaman
interface WalletConnectResult {
    walletAddress: string | undefined;
    isConnected: boolean;
    connectWallet: () => void;
    connector: BrowserProvider | undefined; // Connector sekarang bisa undefined
}

export const useWalletConnect = (): WalletConnectResult => {
    // Gunakan hook resmi dari Web3Modal
    const { open } = useWeb3Modal();
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    // 1. Definisikan Fungsi untuk Membuka Modal
    const connectWallet = useCallback(() => {
        // Panggil fungsi open() dari useWeb3Modal untuk memicu modal
        open();
    }, [open]);

    // 2. Definisikan Connector (Provider Ethers)
    const connector: BrowserProvider | undefined = useMemo(() => {
        // PENTING: Lakukan pengecekan ketat sebelum mencoba membuat BrowserProvider
        if (!walletProvider) {
            // Jika walletProvider belum tersedia (misalnya, saat inisialisasi awal), kembalikan undefined
            return undefined;
        }
        try {
            // Jika tersedia, buat BrowserProvider dari walletProvider (yang adalah EIP-1193 Provider)
            return new BrowserProvider(walletProvider as any);
        } catch (error) {
            // Logging error jika terjadi masalah inisialisasi
            console.error("Error creating Ethers Provider:", error);
            return undefined;
        }
    }, [walletProvider]);

    // 3. Kembalikan semua nilai
    return {
        walletAddress: address,
        isConnected,
        connectWallet,
        connector,
    };
};
