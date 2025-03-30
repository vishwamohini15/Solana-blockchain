"use client";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TokenCreation from "./components/TokenCreation";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, connected, disconnect, select, connecting } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      const fetchBalance = async () => {
        try {
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / 1e9);
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
      <h1 className="text-4xl font-bold mb-6">🔥 Solana dApp</h1>

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

      {/* Token Creation Component */}
      {connected && (
        <div className="mt-10">
          <TokenCreation />
        </div>
      )}
    </div>
  );
}
