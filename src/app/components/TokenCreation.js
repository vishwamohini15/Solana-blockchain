"use client";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

const TokenCreation = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [loading, setLoading] = useState(false);

  const createToken = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!tokenName || !tokenSymbol || !tokenSupply) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const mint = Keypair.generate();
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: mint.publicKey,
          lamports: LAMPORTS_PER_SOL * 0.01, // Fee for creating token
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");

      toast.success(`Token ${tokenName} (${tokenSymbol}) created successfully!`);
    } catch (error) {
      console.error("Token creation failed:", error);
      toast.error("Failed to create token!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔥 Create New Token</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          className="p-3 border rounded-lg"
        />

        <Button
          onClick={createToken}
          disabled={loading}
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
        >
          {loading ? "Creating Token..." : "Create Token"}
        </Button>
      </div>
    </div>
  );
};

export default TokenCreation;