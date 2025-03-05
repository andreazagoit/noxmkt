"use client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { useSession, SessionProvider } from "next-auth/react";
import { signIn } from "next-auth/react";

const DashboardButton = () => {
  const { data: session } = useSession();

  console.log("dash user", session);

  return (
    <button
      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded shadow transition"
      onClick={() => {
        if (session?.user) {
          redirect("/dashboard");
        } else {
          signIn("google", { redirectTo: "/dashboard" });
        }
      }}
    >
      Accedi alla Dashboard
    </button>
  );
};

export default DashboardButton;
