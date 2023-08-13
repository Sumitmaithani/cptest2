"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@material-tailwind/react";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Competency Passbook App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div>
            <Navbar />
            <div>{children}</div>
            <Footer className="mt-15" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}