"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BlockchainData from "./components/BlockchainData";
import TokenCreation from "./components/TokenCreation";
import TokenMinting from "./components/TokenMinting";
import SendTokens from "./components/SendTokens";               // Tokens Send Karne Ke Liye
import TransactionHistory from "./components/TransactionHistory";  // Transaction History Dikhane Ke Liye

export default function Home() {
    return (
        <main className="background min-h-screen bg-gray-100 p-6">
            
            {/* Header with Connect Wallet Button */}
            <div className="title flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">🔥 Solana App</h1>
                <WalletMultiButton />
            </div>

            {/* Responsive Layout */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                
                {/* Blockchain Data */}
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <BlockchainData />
                </div>

                {/* Token Creation */}
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <TokenCreation />
                </div>

                {/* Token Minting */}
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <TokenMinting />
                </div>

                {/* Send Tokens */}
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <SendTokens />
                </div>

                {/* Transaction History */}
                <div className="p-6 bg-white shadow-md rounded-lg col-span-2">
                    <TransactionHistory />
                </div>
            </div>

        </main>
    );
}
