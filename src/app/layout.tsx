import type { Metadata } from "next";
// 1. Import the luxury fonts
import { Playfair_Display, Montserrat } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar"; // Ensure this path is correct

// 2. Configure the fonts
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
  description: "The premier luxury car dealership in Mombasa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 3. Apply the font variables and the obsidian background globally
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-obsidian text-platinum min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        {/* You can add Footer here later */}
      </body>
    </html>
  );
}