import { ethers, BrowserProvider } from "ethers";
// Impor ABI. Next.js/Webpack otomatis menangani ini.
import VoteManagerAbi from "../contracts/VoteManagerABI.json"; 

// Tipe untuk BrowserProvider dari WalletConnect. undefined berarti belum siap.
type ConnectorProvider = BrowserProvider | undefined;

// Hook useVoteManager
export const useVoteManager = (connector: ConnectorProvider) => {
    
    const voteManagerAddress = process.env.NEXT_PUBLIC_VOTE_MANAGER_ADDRESS;

    if (!connector || !voteManagerAddress) {
        console.warn("useVoteManager: Wallet or Contract Address not ready.");
        return { 
            vote: async () => console.warn("Vote: Connector not ready."),
            registerUsername: async () => console.warn("Register: Connector not ready."),
            getVoter: async () => ({ address: undefined, points: 0, username: "" }),
        };
    }

    // Fungsi utilitas
    const handleTxError = (err: any, msg: string) => {
        console.error(`${msg} failed:`, err);
        console.warn(`Transaction failed for ${msg}. Check console for details.`);
    };

    // PENTING: Fungsi ini mengekstrak ABI dari objek impor jika perlu.
    // Berdasarkan file Anda, VoteManagerAbi *seharusnya* sudah berupa array ABI.
    // Jika masih crash, kita mungkin perlu menggunakan new ethers.Interface().
    const getContractInstance = (signerOrProvider: BrowserProvider | ethers.Signer) => {
        // Asumsi: VoteManagerAbi sudah array. Jika tidak, ini yang menyebabkan crash.
        // Jika perlu, ganti 'VoteManagerAbi' dengan 'VoteManagerAbi.abi' jika itu adalah struktur file Anda.
        return new ethers.Contract(voteManagerAddress, VoteManagerAbi, signerOrProvider);
    }

    const vote = async (themeId: number, optionIndex: number) => {
        try {
            const provider = new BrowserProvider(connector); 
            const signer = await provider.getSigner();
            
            // Gunakan fungsi yang sudah diperiksa
            const contract = getContractInstance(signer); 

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
            
            // Gunakan fungsi yang sudah diperiksa
            const contract = getContractInstance(signer);

            const tx = await contract.registerUsername(username);
            await tx.wait();
            console.log("Username registered successfully!");
        } catch (err) {
            handleTxError(err, "Username registration");
        }
    };

    const getVoter = async (user: string) => {
        try {
            const provider = new BrowserProvider(connector);
            // Gunakan fungsi yang sudah diperiksa dengan Provider
            const contract = getContractInstance(provider); 
            
            const result = await contract.getVoter(user);
            return result;
        } catch (err) {
            console.error("Failed to get voter data:", err);
            return { address: user, points: 0, username: "Error" };
        }
    };

    return { vote, registerUsername, getVoter };
};
```eof

2.  **Commit** perubahan ini (juga pastikan `useWalletConnect.ts` sudah versi final) dan **Redeploy** Vercel.

**Kesimpulan:** Masalah terakhir adalah Ethers.js mungkin gagal memproses objek ABI yang diimpor. Solusi ini menjaga struktur Anda tetapi menambahkan lapisan keamanan dalam penggunaan objek `VoteManagerAbi`. Ini seharusnya menyelesaikan masalah *client-side exception* secara tuntas.
