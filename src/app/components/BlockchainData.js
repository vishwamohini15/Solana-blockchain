"use client";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const BlockchainData = () => {
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const connection = new Connection("https://api.devnet.solana.com");

  // Fetch SOL balance
  const fetchSolBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setSolBalance(balance / 1e9); // Convert lamports to SOL
    }
  };

  // Fetch Token Balances
  const fetchTokenBalances = async () => {
    if (publicKey) {
      const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const balances = tokenAccounts.value.map(async (account) => {
        const tokenAddress = new PublicKey(account.pubkey);
        const tokenAccountInfo = await getAccount(connection, tokenAddress);
        const balance = tokenAccountInfo.amount / 1e9; // Convert to SOL units
        return { token: account.pubkey.toBase58(), balance };
      });

      const results = await Promise.all(balances);
      setTokenBalance(results);
    }
  };

  // Fetch Transaction History
  const fetchTransactionHistory = async () => {
    if (publicKey) {
      const signatures = await connection.getSignaturesForAddress(publicKey);
      const history = await Promise.all(
        signatures.slice(0, 5).map(async (sig) => {
          const transaction = await connection.getTransaction(sig.signature);
          return {
            signature: sig.signature,
            date: new Date(sig.blockTime * 1000).toLocaleString(),
            amount: transaction?.meta?.postBalances[0] / 1e9 || 0,
            status: transaction?.meta?.err ? "Failed" : "Success",
          };
        })
      );
      setTransactionHistory(history);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchSolBalance();
      fetchTokenBalances();
      fetchTransactionHistory();
    }
  }, [publicKey]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Blockchain Data</h2>

      {/* Display SOL Balance */}
      <div className="mb-4">
        <h3 className="font-semibold">SOL Balance:</h3>
        <p>{solBalance.toFixed(4)} SOL</p>
      </div>

      {/* Display Token Balances */}
      <div className="mb-4">
        <h3 className="font-semibold">Token Balances:</h3>
        {tokenBalance.length > 0 ? (
          tokenBalance.map((token, index) => (
            <p key={index}>
              {token.token}: {token.balance.toFixed(4)}
            </p>
          ))
        ) : (
          <p>No tokens found</p>
        )}
      </div>

      {/* Display Transaction History */}
      <div>
        <h3 className="font-semibold">Transaction History:</h3>
        {transactionHistory.length > 0 ? (
          transactionHistory.map((tx, index) => (
            <div key={index} className="p-2 border-b border-gray-300">
              <p>
                <strong>Signature:</strong> {tx.signature}
              </p>
              <p>
                <strong>Date:</strong> {tx.date}
              </p>
              <p>
                <strong>Amount:</strong> {tx.amount.toFixed(4)} SOL
              </p>
              <p>
                <strong>Status:</strong> {tx.status}
              </p>
            </div>
          ))
        ) : (
          <p>No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default BlockchainData;
