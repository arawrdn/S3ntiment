import React, { useState } from "react";

interface VotePanelProps {
  themeId: number;
  question: string;
  options: string[];
  onVote: (optionIndex: number) => void;
}

const VotePanel: React.FC<VotePanelProps> = ({ themeId, question, options, onVote }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl w-full max-w-md">
      <h2 className="text-yellow-400 text-2xl mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`p-4 rounded-lg text-white ${selected === idx ? "bg-yellow-400 text-black" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setSelected(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 w-full"
        onClick={() => selected !== null && onVote(selected)}
      >
        Submit Vote
      </button>
    </div>
  );
};

export default VotePanel;
