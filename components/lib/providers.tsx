"use client";
import { type ReactNode } from "react";
import ThemeProvider from "@/components/lib/theme-provider";
import GlobalContextProvider from "@/components/global-context/provider";

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    enableColorScheme
  >
    <GlobalContextProvider>{children}</GlobalContextProvider>
  </ThemeProvider>
);

export default Providers;
