import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { useSession, SessionProvider } from "next-auth/react";
import DndProviderWrapper from "@/components/DndProvider";
import ToastProvider from "@/components/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col h-screen">
        <SessionProvider>
          <ToastProvider>
            <DndProviderWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark" /* system */
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </DndProviderWrapper>
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
