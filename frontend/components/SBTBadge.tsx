import React from "react";

interface SBTBadgeProps {
  rank: number;
}

const SBTBadge: React.FC<SBTBadgeProps> = ({ rank }) => {
  const colors = ["bg-yellow-400", "bg-gray-400", "bg-orange-400"];
  return (
    <div className={`text-black px-3 py-1 rounded-full font-bold ${colors[rank-1]}`}>
      #{rank} SBT
    </div>
  );
};

export default SBTBadge;
