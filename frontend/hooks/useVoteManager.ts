import { Contract, BrowserProvider, type Eip1193Provider } from 'ethers';
import { useWeb3ModalProvider } from '@web3modal/ethers/react';
import { useState, useCallback, useMemo } from 'react';

// ABI untuk Contract VoteManager (gunakan ABI Anda yang sebenarnya)
const VOTE_MANAGER_ABI = [
    "function registerUsername(string calldata _username)",
    "function vote(uint256 _themeId, uint256 _optionIndex)",
    "function getVoter(address _voter) view returns (tuple(string username, uint256[] votes) profile)",
    "function getTheme(uint256 _themeId) view returns (string name, string[] options, uint256[] voteCounts)",
    // ... tambahkan fungsi-fungsi lain yang diperlukan
];

// Alamat Kontrak VoteManager
// Pastikan variabel ini diset di Vercel atau file .env
const contractAddress = process.env.NEXT_PUBLIC_VOTE_MANAGER_ADDRESS;

/**
 * Hook untuk berinteraksi dengan smart contract VoteManager.
 * @param connector Ini adalah Eip1193Provider dari Web3Modal.
 */
export const useVoteManager = () => {
    // Web3Modal v3 (Reown AppKit) menggunakan hook ini
    const { walletProvider } = useWeb3ModalProvider();
    
    // State untuk menyimpan data atau error yang relevan
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Instance Contract dan Provider dibuat ulang jika walletProvider berubah
    const { contract, provider } = useMemo(() => {
        if (!walletProvider || !contractAddress) {
            return { contract: null, provider: null };
        }

        try {
            // FIX TYPING: Lakukan type assertion (as Eip1193Provider) untuk mengatasi error TypeScript.
            const ethersProvider = new BrowserProvider(walletProvider as Eip1193Provider);

            const voteContract = new Contract(
                contractAddress,
                VOTE_MANAGER_ABI,
                ethersProvider // Provider baca saja
            );

            return { contract: voteContract, provider: ethersProvider };
        } catch (e) {
            console.error("Failed to initialize contract or provider:", e);
            return { contract: null, provider: null };
        }
    }, [walletProvider]);

    // Fungsi untuk mendaftarkan Username
    const registerUsername = useCallback(async (username: string) => {
        if (!contract || !provider) return;
        setLoading(true);
        setError(null);
        try {
            // Dapatkan signer untuk mengirim transaksi (menulis data)
            const signer = await provider.getSigner();
            const contractWithSigner = contract.connect(signer);
            
            const tx = await contractWithSigner.registerUsername(username);
            await tx.wait();
            
            alert("Username berhasil didaftarkan!");
        } catch (e: any) {
            console.error("Register username failed:", e);
            setError(e.message || "Gagal mendaftarkan username.");
        } finally {
            setLoading(false);
        }
    }, [contract, provider]);


    // Fungsi untuk melakukan Voting
    const vote = useCallback(async (themeId: number, optionIndex: number) => {
        if (!contract || !provider) return;
        setLoading(true);
        setError(null);
        try {
            // Dapatkan signer
            const signer = await provider.getSigner();
            const contractWithSigner = contract.connect(signer);
            
            // Panggil fungsi vote
            const tx = await contractWithSigner.vote(themeId, optionIndex);
            await tx.wait();
            
            alert("Vote berhasil dikirim!");
        } catch (e: any) {
            console.error("Voting failed:", e);
            setError(e.message || "Gagal mengirim vote.");
        } finally {
            setLoading(false);
        }
    }, [contract, provider]);


    // Fungsi untuk mendapatkan detail Voter
    const getVoter = useCallback(async (voterAddress: string) => {
        if (!contract) return null;
        try {
            const profile = await contract.getVoter(voterAddress);
            return profile;
        } catch (e) {
            console.error("Failed to get voter profile:", e);
            return null;
        }
    }, [contract]);

    // ... Anda dapat menambahkan fungsi getTheme di sini
    
    // Kembalikan semua fungsi dan state
    return {
        registerUsername,
        vote,
        getVoter,
        loading,
        error,
        isConnected: !!walletProvider // Menunjukkan apakah dompet terhubung
    };
};
```eof

**Perubahan Kunci:**

Baris ini adalah perbaikan *type* yang spesifik untuk `ethers.js` dan Web3Modal:

```typescript
const ethersProvider = new BrowserProvider(walletProvider as Eip1193Provider);
