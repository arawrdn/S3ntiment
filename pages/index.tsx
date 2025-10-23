import React, { useState } from "react";
import VotePanel from "../components/VotePanel";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { themes } from "../themes/themes_oct.json";

const HomePage = () => {
  const { walletAddress, connectWallet } = useWalletConnect();
  const today = new Date().toISOString().slice(0,10).replace(/-/g,"");
  const theme = themes.find(t => t.id === today);
  const topVoters = [
    { username: "Alice", wallet: "0x1234...", points: 5 },
    { username: "Bob", wallet: "0x5678...", points: 3 }
  ];

  const handleVote = (optionIndex: number) => {
    console.log("Voted:", optionIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-black flex flex-col items-center">
      <Navbar walletAddress={walletAddress} connectWallet={connectWallet} />
      <main className="flex flex-col items-center mt-10 gap-6">
        {theme ? (
          <VotePanel themeId={theme.id} question={theme.question} options={theme.options} onVote={handleVote} />
        ) : (
          <p className="text-white">No theme for today</p>
        )}
        <Leaderboard topVoters={topVoters} />
      </main>
    </div>
  );
};

export default HomePage;
