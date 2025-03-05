import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await auth();

  if (!session) redirect("/");

  return <React.Fragment>{children}</React.Fragment>;
};

export default DashboardLayout;
