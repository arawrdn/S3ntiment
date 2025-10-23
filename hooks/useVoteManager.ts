import { ethers } from "ethers";

export const useVoteManager = (voteManagerAddress: string, abi: any, connector: any) => {
  const vote = async (themeId: number, optionIndex: number) => {
    if (!connector) return alert("Wallet not connected");
    const provider = new ethers.providers.Web3Provider(connector);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(voteManagerAddress, abi, signer);

    try {
      const tx = await contract.vote(themeId, optionIndex);
      await tx.wait();
      alert("Vote submitted!");
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  return { vote };
};
