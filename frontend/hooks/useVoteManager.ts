// frontend/hooks/useVoteManager.ts

import { ethers, BrowserProvider } from "ethers";
import VoteManagerAbi from "../contracts/VoteManagerABI.json";
// Catatan: Pastikan VoteManagerAbi adalah ABI yang benar untuk kontrak Anda

// Tipe untuk BrowserProvider dari WalletConnect. undefined berarti belum siap.
type ConnectorProvider = BrowserProvider | undefined;

// Hook useVoteManager
export const useVoteManager = (connector: ConnectorProvider) => {
    
    // PERBAIKAN KRITIS 1: Menggunakan NEXT_PUBLIC_ untuk variabel publik
    const voteManagerAddress = process.env.NEXT_PUBLIC_VOTE_MANAGER_ADDRESS;

    // PERBAIKAN KRITIS 2: Pengecekan stabilitas di awal hook (Guard Clause)
    if (!connector || !voteManagerAddress) {
        console.warn("useVoteManager: Wallet or Contract Address not ready.");
        // Mengembalikan fungsi dummy yang tidak akan crash saat dipanggil
        return { 
            vote: async () => console.warn("Vote: Connector not ready."),
            registerUsername: async () => console.warn("Register: Connector not ready."),
            getVoter: async () => ({ address: undefined, points: 0, username: "" }),
        };
    }

    // Fungsi utilitas untuk menangani error transaksi tanpa alert()
    const handleTxError = (err: any, msg: string) => {
        console.error(`${msg} failed:`, err);
        // Tampilkan pesan di console (digantikan oleh notifikasi Toast di aplikasi sungguhan)
        console.warn(`Transaction failed for ${msg}. Check console for details.`);
    };

    const vote = async (themeId: number, optionIndex: number) => {
        try {
            const provider = new BrowserProvider(connector); 
            const signer = await provider.getSigner();
            
            const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, signer);

            const tx = await contract.vote(themeId, optionIndex);
            await tx.wait();
            console.log("Vote submitted successfully!");
        } catch (err) {
            handleTxError(err, "Vote submission");
        }
    };

    const registerUsername = async (username: string) => {
        try {
            const provider = new BrowserProvider(connector);
            const signer = await provider.getSigner();
            
            const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, signer);

            const tx = await contract.registerUsername(username);
            await tx.wait();
            console.log("Username registered successfully!");
        } catch (err) {
            handleTxError(err, "Username registration");
        }
    };

    const getVoter = async (user: string) => {
        try {
            // Untuk read-only, provider tanpa Signer sudah cukup
            const provider = new BrowserProvider(connector);
            const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, provider);
            
            const result = await contract.getVoter(user);
            return result;
        } catch (err) {
            console.error("Failed to get voter data:", err);
            return { address: user, points: 0, username: "Error" };
        }
    };

    return { vote, registerUsername, getVoter };
};
