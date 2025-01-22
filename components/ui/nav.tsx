import React from "react";

type NavProps = {
  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;
};

const Nav = ({ leftItems, rightItems }: NavProps) => {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex">{leftItems}</div>
      <div className="flex">{rightItems}</div>
    </nav>
  );
};

export default Nav;
