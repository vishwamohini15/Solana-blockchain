"use client";
import WalletContextProvider from "./components/WalletContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { TransactionProvider } from "./components/TransactionContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          {/* <ToastContainer />
          {children} */}
          <TransactionProvider>  
                    {children}
                    <ToastContainer />
                </TransactionProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
