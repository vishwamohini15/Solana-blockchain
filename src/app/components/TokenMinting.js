"use client";
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "../ui/button";

const TokenMinting = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const handleMint = async () => {
        if (!publicKey) {
            toast.error("Wallet not connected!");
            return;
        }

        try {
            const recipientPubkey = new PublicKey(recipient);
            
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubkey,
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);

            toast.success(`Tokens minted! Tx: ${signature}`);
        } catch (error) {
            console.error("Error minting tokens:", error);
            toast.error("Failed to mint tokens!");
        }
    };

    return (
        <div className="boxstyle p-7">
            <h2 className=" text-2xl font-bold mb-4">Token Minting</h2>
            
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Recipient Wallet Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="p-2 border rounded"
                />

                <input
                    type="number"
                    placeholder="Amount (SOL)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 border rounded"
                />

                <Button 
                    onClick={handleMint}
                    className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
                >
                    Mint Tokens
                </Button>
            </div>
        </div>
    );
};

export default TokenMinting;
