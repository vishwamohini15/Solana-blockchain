"use client";
import React from "react";
import WalletContextProvider from "./components/WalletContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Home = () => {
  return (
    <WalletContextProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Solana Dapp</h1>
          <WalletMultiButton />
          <p className="mt-4">Connect your wallet to interact with Solana blockchain.</p>
        </div>
      </div>
    </WalletContextProvider>
  );
};

export default Home;
