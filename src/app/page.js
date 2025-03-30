"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import BlockchainData from "./components/BlockchainData";
import TokenCreation from "./components/TokenCreation";
import TokenMinting from "./components/TokenMinting";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100 p-6">
            
            {/* Header with Connect Wallet Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">🔥 Solana dApp</h1>
                <WalletMultiButton />
            </div>

            {/* Blockchain Data Component - Balance & Transaction History */}
            <div className="p-6 bg-white shadow-md rounded-lg mb-6">
                <BlockchainData />
            </div>

            {/* Token Creation Component */}
            <div className="p-6 bg-white shadow-md rounded-lg mb-6">
                <TokenCreation />
            </div>

            {/* Token Minting Component */}
            <div className="p-6 bg-white shadow-md rounded-lg">
                <TokenMinting />
                
            </div>
        </main>
    );
}
