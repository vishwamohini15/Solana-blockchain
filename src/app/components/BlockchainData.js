"use client";
import { useEffect, useState } from "react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const BlockchainData = () => {
    const [solBalance, setSolBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState([]);
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        if (wallet.publicKey) {
            fetchBalances();
        }
    }, [wallet.publicKey]);

    const fetchBalances = async () => {
        try {
            setLoading(true);
            const connection = new Connection("https://api.devnet.solana.com");

            // Fetch SOL balance
            const balance = await connection.getBalance(wallet.publicKey);
            setSolBalance(balance / LAMPORTS_PER_SOL);

            // Fetch token accounts and balances
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
                wallet.publicKey,
                { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
            );

            const tokens = tokenAccounts.value.map((account) => {
                return {
                    mint: account.account.data.parsed.info.mint,
                    amount: account.account.data.parsed.info.tokenAmount.uiAmount,
                };
            });

            setTokenBalance(tokens);
        } catch (error) {
            console.error("Error fetching balances:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="boxstyle p-6">
            <h2 className="text-2xl font-bold mb-4">Wallet Balances</h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p className="mb-2">💰 <strong>SOL Balance:</strong> {solBalance} SOL</p>

                    <h3 className="mt-4 mb-2">🪙 Token Balances:</h3>
                    {tokenBalance.length > 0 ? (
                        tokenBalance.map((token, index) => (
                            <div key={index} className="border p-2 rounded-lg my-2">
                                <p>Mint: {token.mint}</p>
                                <p>Amount: {token.amount}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tokens found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlockchainData;
