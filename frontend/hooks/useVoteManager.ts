import { ethers, BrowserProvider } from "ethers"; // ⬅️ PERBAIKAN 1
import VoteManagerAbi from "../contracts/VoteManagerABI.json";

export const useVoteManager = (connector: any) => {
  const voteManagerAddress = process.env.VOTE_MANAGER_ADDRESS!;
  
  const vote = async (themeId: number, optionIndex: number) => {
    if (!connector) return alert("Wallet not connected");
    
    // ⬅️ PERBAIKAN 2
    const provider = new BrowserProvider(connector); 
    
    // ⬅️ PERBAIKAN 3
    const signer = await provider.getSigner(); 
    
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
    
    // ⬅️ PERBAIKAN 2
    const provider = new BrowserProvider(connector); 
    
    // ⬅️ PERBAIKAN 3
    const signer = await provider.getSigner(); 
    
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
    
    // ⬅️ PERBAIKAN 2 (Hanya perlu untuk read-only)
    const provider = new BrowserProvider(connector); 
    
    const contract = new ethers.Contract(voteManagerAddress, VoteManagerAbi, provider);
    const result = await contract.getVoter(user);
    return result; 
  };

  return { vote, registerUsername, getVoter };
};
