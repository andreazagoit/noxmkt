import { cn } from "@/lib/utils";
import React from "react";

type NavProps = {
  children: React.ReactNode;
  className?: string;
};

const Nav = ({ children, className }: NavProps) => {
  return (
    <nav
      className={cn("flex justify-between items-center py-4 gap-4", className)}
    >
      {children}
    </nav>
  );
};

export default Nav;
