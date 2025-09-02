import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteGuard from "../containers/RouteGuard";
import Sidebar from "@/components/organisms/Sidebar";
import Script from "next/script";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "macnesa",
  description: "macnesa personal website",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://static.thenounproject.com/png/2470574-200.png" />
      </head>
      {/* bg-dark */}
      <body className=" min-h-screen bg-white dark:bg-neutral-900">
        {/* <Header/> */}
        {/* Sidebar fixed */}
        {/* <Sidebar /> */}
        
        <main className="flex justify-center border-red-300 min-h-screen">
          <div className="w-full max-w-[1600px]  ">
            <RouteGuard>
              {children}
            </RouteGuard>
          </div>
        </main> 
        
        <Footer/>
        
        <Script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" />
        <Script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" />
      </body>
    </html>
  );
}
