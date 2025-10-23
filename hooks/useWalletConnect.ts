import { useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const useWalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connector, setConnector] = useState<any>(null);

  const connectWallet = async () => {
    const wc = new WalletConnect({ bridge: "https://bridge.walletconnect.org" });
    setConnector(wc);

    if (!wc.connected) {
      await wc.createSession();
      QRCodeModal.open(wc.uri, () => {});
    }

    wc.on("connect", (error: any, payload: any) => {
      if (error) throw error;
      const { accounts } = payload.params[0];
      setWalletAddress(accounts[0]);
      QRCodeModal.close();
    });
  };

  return { walletAddress, connectWallet, connector };
};
