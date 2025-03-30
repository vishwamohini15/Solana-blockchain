"use client";

import React, { createContext, useContext, useState } from "react";
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "react-toastify";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const connection = new Connection("https://api.devnet.solana.com");

    const sendTokens = async (wallet, recipientAddress, amount) => {
        try {
            if (!wallet || !wallet.publicKey) {
                throw new Error("Wallet not connected");
            }

            const recipient = new PublicKey(recipientAddress);
            const sender = wallet.publicKey;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: sender,
                    toPubkey: recipient,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);

            const newTransaction = {
                id: signature,
                from: sender.toBase58(),
                to: recipient.toBase58(),
                amount: amount,
                timestamp: new Date().toLocaleString(),
            };

            setTransactions((prev) => [newTransaction, ...prev]);
            toast.success(`Transaction Successful: ${signature}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            toast.error("Transaction failed!");
        }
    };

    return (
        <TransactionContext.Provider value={{ transactions, sendTokens }}>
            {children}
        </TransactionContext.Provider>
    );
};
