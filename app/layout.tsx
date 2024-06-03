import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { SuperTokensProvider } from "./components/auth/SuperTokensProvider";
import { ApolloClientWrapper } from "./lib/ApolloClientWrapper";

import Navbar from "./components/navbar/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "CoinNewsAggregator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SuperTokensProvider>
        <body className={`${montserrat.className} text-gray-300`}>
          <ApolloClientWrapper>
            <Navbar />
            {children}
          </ApolloClientWrapper>
        </body>
      </SuperTokensProvider>
    </html>
  );
}
