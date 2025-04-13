import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shreddit",
  description: "A community-driven platform for sharing and discussing content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <header className="bg-primary-600 h-[20vh] shadow-md">
            <div className="container mx-auto px-4 h-full flex flex-col justify-between">
              <div className="flex items-center justify-center h-full">
                <Image 
                  src="/images/Shreddit logo.png" 
                  alt="Shreddit Logo" 
                  width={200} 
                  height={50} 
                />
              </div>
              <div className="flex justify-end pb-4">
                <Link href="/login" className="text-primary-50 hover:text-secondary-300 transition-colors">
                  Cadastre-se ou clique aqui para entrar
                </Link>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
