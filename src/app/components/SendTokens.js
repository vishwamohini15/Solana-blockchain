"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import {
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

const SendToken = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const handleSendToken = async () => {
        if (!publicKey) {
            toast.error("Please connect your wallet!");
            return;
        }

        if (!recipient || !amount) {
            toast.error("Please enter recipient address and amount!");
            return;
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipient),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "confirmed");

            toast.success(`Transaction Successful: ${signature}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed!");
        }
    };

    return (
        <div className="boxstyle p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🚀 Send Token</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Recipient Address:</label>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter recipient wallet address"
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Amount (SOL):</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-2 border rounded"
                />
            </div>

            <Button onClick={handleSendToken} className="bg-blue-500 text-white w-full">
                Send Token
            </Button>
        </div>
    );
};

export default SendToken;
