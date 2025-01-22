import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="px-4 w-full">{children}</div>;
};

export default Container;
