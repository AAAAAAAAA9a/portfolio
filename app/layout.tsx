import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artur Lisowski | Portfolio",
  description:
    "Computer Science Student, Full-stack Developer & AI Enthusiast Portfolio",
  keywords:
    "computer science, developer, AI, portfolio, full-stack, web development, student",
  authors: [{ name: "Artur Lisowski", url: "https://github.com/username" }],
  creator: "Artur Lisowski",
};

export const viewport: Viewport = {
  themeColor: "#2dd4bf",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-background text-text-primary min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow w-full pt-20">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
