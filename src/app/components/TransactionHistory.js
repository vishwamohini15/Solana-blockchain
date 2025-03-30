"use client";

import React from "react";
import { useTransaction } from "./TransactionContext";

const TransactionHistory = () => {
    const { transactions } = useTransaction();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">📜 Transaction History</h2>
            
            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions found</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {transactions.map((tx, index) => (
                        <li key={index} className="py-2">
                            <p>🔗 Tx ID: <a href={`https://explorer.solana.com/tx/${tx.id}?cluster=devnet`} target="_blank" className="text-blue-500">{tx.id}</a></p>
                            <p>From: {tx.from}</p>
                            <p>To: {tx.to}</p>
                            <p>Amount: {tx.amount} SOL</p>
                            <p className="text-gray-400 text-sm">📅 {tx.timestamp}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;
