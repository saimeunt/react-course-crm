import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM",
  description: "CRM to handle all your customers and orders",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn(geistSans.variable, geistMono.variable, "antialiased")}>
      <Providers>{children}</Providers>
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
