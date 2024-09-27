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
} from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { LuArrowLeft, LuMail } from "react-icons/lu";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import BackButton from "@/components/navigation/BackButton";
import HomeButton from "@/components/navigation/HomeButton";
import Footer from "@/components/navigation/Footer";

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
          <div className="flex items-center justify-between m-4 z-50 ">
            <div className="flex items-center justify-between gap-2 m-4 z-50 ">
              <BackButton />
              <HomeButton />
            </div>
            <div className="flex items-center justify-between gap-4 m-4 z-50 ">
              <a href="mailto: info@teaserfest.com">
                <LuMail />
              </a>

              <UserButton />
            </div>
          </div>
          {children}
          {/* <Footer /> */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
