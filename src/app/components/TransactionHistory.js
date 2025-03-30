"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

const TransactionHistory = () => {
    const { publicKey, connected } = useWallet();
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        const fetchTransactions = async () => {
            if (connected && publicKey) {
                const connection = new Connection("https://api.devnet.solana.com");

                try {
                    const confirmedSignatures = await connection.getSignaturesForAddress(
                        new PublicKey(publicKey),
                        { limit: 10 } // Last 10 transactions
                    );

                    const txDetails = await Promise.all(
                        confirmedSignatures.map(async (sig) => {
                            const tx = await connection.getTransaction(sig.signature);
                            return {
                                signature: sig.signature,
                                blockTime: tx?.blockTime
                                    ? new Date(tx.blockTime * 1000).toLocaleString()
                                    : "N/A",
                                slot: tx?.slot,
                                status: tx?.meta?.err ? "Failed" : "Success",
                            };
                        })
                    );

                    setTransactions(txDetails);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                    toast.error("Failed to fetch transactions!");
                }
            }
        };

        fetchTransactions();
    }, [connected, publicKey]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-4">📝 Transaction History</h2>
            
            {transactions.length === 0 ? (
                <p>No recent transactions found.</p>
            ) : (
                <ul>
                    {transactions.map((tx, index) => (
                        <li key={index} className="border-b py-2">
                            <p><strong>Signature:</strong> {tx.signature}</p>
                            <p><strong>Block Time:</strong> {tx.blockTime}</p>
                            <p><strong>Status:</strong> {tx.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;
