import WalletContextProvider from "./components/WalletContext";
import "./globals.css";
// import WalletContextProvider from "../components/WalletContext";

export const metadata = {
  title: "Solana dApp",
  description: "Solana Blockchain Integration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <WalletContextProvider>
        {children}
       </WalletContextProvider>
        
      </body>
    </html>
  );
}
