"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {
  const wallet = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet.connected) {
      fetchBalance();
    }
  }, [wallet.connected]);

  const fetchBalance = async () => {
    const connection = new Connection("https://api.devnet.solana.com");
    const balance = await connection.getBalance(new PublicKey(wallet.publicKey));
    setBalance(balance / LAMPORTS_PER_SOL);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Solana dApp</h1>
      
      {wallet.connected ? (
        <>
          <p className="text-lg">Wallet: {wallet.publicKey.toString()}</p>
          <p className="text-lg">Balance: {balance} SOL</p>
          <button
            onClick={() => wallet.disconnect()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={() => wallet.connect()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Phantom Wallet
        </button>
      )}
    </div>
  );
}
