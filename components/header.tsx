import React from "react";
import SignIn from "./sign-in";
import { SignOut } from "./sign-out";
import { auth } from "@/auth";
import Link from "next/link";
import AccountMenu from "./account-menu";
import { SidebarTrigger } from "./ui/sidebar";

const Header = async () => {
  const session = await auth();

  return (
    <div className="h-16 flex justify-between items-center px-4 border-b border-b-1 border-neutral-200 dark:border-neutral-800">
      <SidebarTrigger />
      <Link href={"/"}></Link>
      <div>{!session?.user ? <SignIn /> : <AccountMenu />}</div>
    </div>
  );
};

export default Header;
