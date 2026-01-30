import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the Navbar
import Footer from "@/components/Footer"; // Import the Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        {/* The Navbar sits at the top of every page */}
        <Navbar />

        {/* 'flex-grow' ensures the footer is pushed to the bottom even on empty pages */}
        <main className="flex-grow">
          {children}
        </main>

        {/* The Footer sits at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}