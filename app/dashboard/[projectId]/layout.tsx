import type { Metadata } from "next";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "NOXMKT",
  description: "Noxis Marketing",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const projectId = (await params).projectId;

  return (
    <>
      <SidebarProvider>
        <AppSidebar projectId={projectId} />
        <main className="w-full flex flex-col">
          <Header />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
