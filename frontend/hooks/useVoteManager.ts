import { ethers, BrowserProvider } from "ethers"; // ⬅️ PERUBAHAN 1: Import BrowserProvider
import VoteManagerAbi from "../contracts/VoteManagerABI.json";

// Catatan: Karena Anda menggunakan TypeScript, idealnya Anda harus menentukan tipe 
// yang lebih spesifik untuk 'connector', seperti 'Provider' dari Ethers v6.
// Untuk saat ini, kita biarkan 'any' agar fokus pada perbaikan sintaks.

export const useVoteManager = (connector: any) => {
  const voteManagerAddress = process.env.VOTE_MANAGER_ADDRESS!;
  
  const vote = async (themeId: number, optionIndex: number) => {
    if (!connector) return alert("Wallet not connected");
    
    // ⬅️ PERUBAHAN 2: Ganti ethers.providers.Web3Provider menjadi BrowserProvider
    const provider = new BrowserProvider(connector);
    const signer = await provider.getSigner(); // ⬅️ PERUBAHAN 3: getSigner() sekarang harus di-await
    
    const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, signer);

    try {
      const tx = await contract.vote(themeId, optionIndex);
      await tx.wait();
      alert("Vote submitted!");
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  const registerUsername = async (username: string) => {
    if (!connector) return alert("Wallet not connected");
    
    // ⬅️ PERUBAHAN 4
    const provider = new BrowserProvider(connector);
    const signer = await provider.getSigner(); // ⬅️ PERUBAHAN 5
    
    const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, signer);

    try {
      const tx = await contract.registerUsername(username);
      await tx.wait();
      alert("Username registered!");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  const getVoter = async (user: string) => {
    if (!connector) return null;
    
    // ⬅️ PERUBAHAN 6: Cukup menggunakan BrowserProvider untuk read-only
    const provider = new BrowserProvider(connector); 
    
    // Catatan: Jika ini adalah read-only (tanpa interaksi user), 
    // Anda mungkin ingin menggunakan JsonRpcProvider dengan RPC URL Base/Celo yang spesifik.
    // Namun, untuk sementara, BrowserProvider ini akan berfungsi untuk read-only.
    
    const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, provider);
    
    try {
        const result = await contract.getVoter(user);
        return result; // [username, totalPoints]
    } catch (err) {
        console.error("Error fetching voter:", err);
        return null;
    }
  };

  return { vote, registerUsername, getVoter };
};
