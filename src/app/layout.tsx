import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Italiana } from "next/font/google";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/navigation/HomeButton";
import Footer from "@/components/navigation/Footer";
import { useState } from "react";
import CartSheet from "@/components/shared/CartSheet";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import ShoppingCart from "@/components/shared/ShoppingCart";
import NavBar from "@/components/navigation/NavBar";

const inter = Inter({ subsets: ["latin"] });

const space = Space_Grotesk({
  subsets: ["latin"],
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Teaser Festival 2025",
  description: "Teaser Festival in New Orleans, January, 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={space.className}>
          <ShoppingCartProvider>
            <NavBar />
            {children}
            <Toaster />
          </ShoppingCartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
