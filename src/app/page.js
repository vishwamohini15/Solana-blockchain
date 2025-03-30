"use client";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import toast from "react-toastify";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, connected, disconnect, select, connecting } = useWallet();
  const [balance, setBalance] = useState(0);

  // Fetch wallet balance
  useEffect(() => {
    if (publicKey) {
      const fetchBalance = async () => {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / 1e9); // Convert from lamports to SOL
        } catch (error) {
          console.error("Error fetching balance:", error);
          toast.error("Failed to fetch balance!");
        }
      };
      fetchBalance();
    }
  }, [publicKey, connection]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Solana DApp</h1>

      {/* Wallet Connection Button */}
      {!connected ? (
        <Button
          onClick={() => select("Phantom")}
          disabled={connecting}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600"
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Wallet: {publicKey?.toBase58()}</p>
          <p className="text-lg">Balance: {balance.toFixed(4)} SOL</p>
          <Button
            onClick={disconnect}
            className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600"
          >
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
}
