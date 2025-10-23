import React, { useEffect, useState } from "react";
import VotePanel from "../components/VotePanel";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useVoteManager } from "../hooks/useVoteManager";
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

interface Theme {
    id: number;
    question: string;
    options: string[];
}

const HomeContent = () => {
    // Hooks Web3 yang menyebabkan masalah SSR sekarang aman di sini
    const { walletAddress, connectWallet, connector } = useWalletConnect();
    const { vote, registerUsername, getVoter } = useVoteManager(connector);
    
    // Opsional: Cek status Web3Modal untuk tampilan loading/unconnected
    const { isConnected } = useWeb3ModalAccount();

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
        if (!username) {
            console.error("Enter a username"); // Ganti dari alert()
            return;
        }
        await registerUsername(username);
    };

    // Tampilan jika belum terhubung
    if (!isConnected) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-black flex flex-col items-center">
                {/* Gunakan Navbar untuk tombol Connect */}
                <Navbar walletAddress={walletAddress} connectWallet={connectWallet} /> 
                <main className="flex flex-col items-center mt-32 text-white">
                    <p className="text-xl mb-4">Please connect your wallet to access S3ntiment platform.</p>
                    <button 
                        className="bg-yellow-400 text-black px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-600/50 transition duration-300" 
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>
                </main>
            </div>
        );
    }
    
    // Tampilan Utama setelah terhubung
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-black flex flex-col items-center">
            <Navbar walletAddress={walletAddress} connectWallet={connectWallet} />
            <main className="flex flex-col items-center mt-10 gap-6 w-full px-4">
                {walletAddress && !username && (
                    <div className="blur-panel bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col gap-3 max-w-sm w-full text-white">
                        <p className="font-semibold">Setup Username</p>
                        <input
                            type="text"
                            placeholder="Enter your unique username"
                            className="p-2 rounded bg-white text-black placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button 
                            className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition" 
                            onClick={handleRegisterUsername}
                        >
                            Register Username
                        </button>
                    </div>
                )}

                {theme ? (
                    <VotePanel themeId={theme.id} question={theme.question} options={theme.options} onVote={handleVote} />
                ) : (
                    <p className="text-white mt-10 text-lg font-medium">No theme available for today. Check back tomorrow!</p>
                )}

                <Leaderboard topVoters={topVoters} />
            </main>
        </div>
    );
};

export default HomeContent;
