import React from "react";

interface LeaderboardProps {
  topVoters: { username: string; wallet: string; points: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ topVoters }) => {
  return (
    <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl w-full max-w-md mt-6">
      <h3 className="text-yellow-400 text-xl mb-2">Leaderboard</h3>
      <ul>
        {topVoters.map((voter, idx) => (
          <li key={idx} className="flex justify-between text-white mb-1">
            <span>{voter.username} ({voter.wallet.slice(0,6)}...)</span>
            <span>{voter.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
