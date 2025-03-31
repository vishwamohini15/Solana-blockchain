"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BlockchainData from "./components/BlockchainData";
import TokenCreation from "./components/TokenCreation";
import TokenMinting from "./components/TokenMinting";
import SendTokens from "./components/SendTokens";               // Tokens Send Karne Ke Liye
import TransactionHistory from "./components/TransactionHistory";  // Transaction History Dikhane Ke Liye

export default function Home() {
    return (
        
        <main className=" background min-h-screen bg-gray-100 p-6">
            
            {/* Header with Connect Wallet Button */}
            <div className="title flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">🔥 Solana App</h1>
                <WalletMultiButton />
            </div>

            {/* Blockchain Data Component - Balance & Transaction History */}
            <div className="p-6 bg-white shadow-md rounded-lg mb-6">
                <BlockchainData />
            </div>

            {/* Token Creation Component */}
            <div className=" p-6 bg-white shadow-md rounded-lg mb-6">
                <TokenCreation />
            </div>

            {/* Token Minting Component */}
            <div className="p-6 bg-white shadow-md rounded-lg mb-6">
                <TokenMinting />
            </div>

            {/* Send Tokens Component */}
            <div className="p-6 bg-white shadow-md rounded-lg mb-6">
                <SendTokens />
            </div>

            {/* Transaction History Component */}
            <div className="p-6 bg-white shadow-md rounded-lg">
                <TransactionHistory />
            </div>

        </main>
    );
}
