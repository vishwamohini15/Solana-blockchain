"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../ui/button";
import { useTransaction } from "./TransactionContext";
import { toast } from "react-toastify";

const SendTokens = () => {
    const { sendTokens } = useTransaction();
    const wallet = useWallet();

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = async () => {
        if (!recipient || !amount) {
            toast.error("Please fill in all fields!");
            return;
        }

        await sendTokens(wallet, recipient, parseFloat(amount));
        setRecipient("");
        setAmount("");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">💸 Send Tokens</h2>

            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <Button
                onClick={handleSend}
                className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600"
            >
                Send Tokens
            </Button>
        </div>
    );
};

export default SendTokens;
