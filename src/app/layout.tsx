import type { Metadata } from "next";
// 1. IMPORT THE NEW FONTS
import { Playfair_Display, Montserrat } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 2. CONFIGURE THEM
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tajiri Motors | Premium Cars",
  description: "The best car deals in Mombasa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. APPLY THE VARIABLES HERE */}
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen bg-[#141416]`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}