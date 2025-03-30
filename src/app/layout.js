"use client";
import WalletContextProvider from "./components/WalletContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { metadata } from "./metadata";  // Import metadata from a server file

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <WalletContextProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
