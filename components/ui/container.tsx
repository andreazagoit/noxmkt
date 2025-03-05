import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn("px-4 w-full", className)}>{children}</div>;
};

export default Container;
