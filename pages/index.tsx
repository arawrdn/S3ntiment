import React, { useEffect, useState } from "react";
import VotePanel from "../components/VotePanel";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useVoteManager } from "../hooks/useVoteManager";

interface Theme {
  id: number;
  question: string;
  options: string[];
}

const HomePage = () => {
  const { walletAddress, connectWallet, connector } = useWalletConnect();
  const { vote, registerUsername, getVoter } = useVoteManager(connector);

  const [theme, setTheme] = useState<Theme | null>(null);
  const [topVoters, setTopVoters] = useState<{username:string; wallet:string; points:number}[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchTheme = async () => {
      const res = await fetch("/themes/themes_oct.json");
      const allThemes: Theme[] = await res.json();
      const today = parseInt(new Date().toISOString().slice(0,10).replace(/-/g,""));
      const todayTheme = allThemes.find(t => t.id === today);
      setTheme(todayTheme || null);
    };

    fetchTheme();

    // dummy leaderboard
    setTopVoters([
      { username: "Alice", wallet: "0x1234...", points: 5 },
      { username: "Bob", wallet: "0x5678...", points: 3 }
    ]);
  }, []);

  const handleVote = async (optionIndex: number) => {
    if (!theme) return;
    await vote(theme.id, optionIndex);
    // update leaderboard lokal sementara
    setTopVoters(prev => [...prev]); 
  };

  const handleRegisterUsername = async () => {
    if (!username) return alert("Enter a username");
    await registerUsername(username);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-black flex flex-col items-center">
      <Navbar walletAddress={walletAddress} connectWallet={connectWallet} />
      <main className="flex flex-col items-center mt-10 gap-6 w-full px-4">
        {walletAddress && !username && (
          <div className="blur-panel flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter your username"
              className="p-2 rounded"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <button className="bg-yellow-400 text-black px-4 py-2 rounded" onClick={handleRegisterUsername}>
              Register Username
            </button>
          </div>
        )}

        {theme ? (
          <VotePanel themeId={theme.id} question={theme.question} options={theme.options} onVote={handleVote} />
        ) : (
          <p className="text-white mt-10">No theme for today</p>
        )}

        <Leaderboard topVoters={topVoters} />
      </main>
    </div>
  );
};

export default HomePage;
