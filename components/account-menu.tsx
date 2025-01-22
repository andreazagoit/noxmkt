import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignOut } from "./sign-out";

const AccountMenu = async () => {
  const session = await auth();

  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const words = fullName.trim().split(/\s+/); // Divide per spazi multipli
    const initials = words.map((word: string) => word.charAt(0).toUpperCase());
    return initials.slice(0, 2).join(""); // Restituisce massimo 2 iniziali
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={session!.user!.image as string}
            alt={session!.user!.name as string}
          />
          <AvatarFallback>
            {getInitials(session!.user!.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
