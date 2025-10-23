import React from "react";

interface NavbarProps {
  walletAddress: string | null;
  connectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ walletAddress, connectWallet }) => {
  return (
    <nav className="w-full bg-black/50 backdrop-blur-md flex justify-between p-4">
      <h1 className="text-yellow-400 text-xl font-bold">S3ntiment</h1>
      <button
        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        onClick={connectWallet}
      >
        {walletAddress ? walletAddress.slice(0,6) + "..." : "Connect Wallet"}
      </button>
    </nav>
  );
};

export default Navbar;
