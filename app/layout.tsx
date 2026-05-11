import type { Metadata } from "next";	
import "./globals.css";	
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SpaceBackground from "../components/SpaceBackground";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {	
  title: "Portfolio — Phan Thanh Khải",	
  description: "Website portfolio cá nhân — CTK46",	
};	
	
import { LanguageProvider } from "@/lib/language-context";

export default function RootLayout({	
  children,	
}: Readonly<{	
  children: React.ReactNode;	
}>) {	
  return (	
    <html lang="vi" className={cn("font-sans dark", geist.variable)} suppressHydrationWarning>	
      <body className="min-h-screen flex flex-col bg-transparent text-white overflow-x-hidden">	
        <LanguageProvider>
          <SpaceBackground />
          <Navbar />	
          <main className="flex-1 relative z-10 pointer-events-none">
            {children}
          </main>	
          <Footer />	
        </LanguageProvider>
      </body>	
    </html>	
  );	
}	
