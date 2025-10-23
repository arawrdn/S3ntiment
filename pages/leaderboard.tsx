import React from "react";
import Leaderboard from "../components/Leaderboard";

const sampleVoters = [
  { username: "Alice", wallet: "0x1234...", points: 5 },
  { username: "Bob", wallet: "0x5678...", points: 3 },
  { username: "Charlie", wallet: "0x9abc...", points: 2 }
];

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-black/80 flex justify-center items-start p-6">
      <Leaderboard topVoters={sampleVoters} />
    </div>
  );
};

export default LeaderboardPage;
