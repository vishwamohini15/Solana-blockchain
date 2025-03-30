"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Button } from "@/app/components/ui/button";   // ✅ Correct path



const TokenCreation = () => {
  const [minting, setMinting] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleCreateToken = async () => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      toast.info("Creating token...");
      const mint = new Keypair();
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: mint.publicKey,
          lamports: 1 * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");
      toast.success("Token created successfully!");
    } catch (error) {
      console.error("Error creating token:", error);
      toast.error("Failed to create token.");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Solana Token Management</h1>
      
      <div className="flex gap-4">
        <Button onClick={handleCreateToken} className="bg-blue-500 text-white">
          Create Token
        </Button>
        <Button className="bg-green-500 text-white" onClick={() => toast.info("Mint Token clicked!")}>
          Mint Token
        </Button>
      </div>
      
    </div>

    
  );
};

export default TokenCreation;
