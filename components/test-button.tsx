"use client";
import { sendEmailGmail } from "@/utils/email";
import React from "react";

const TestButton = () => {
  const handleClick = async () => {
    await sendEmailGmail();
  };

  return <div onClick={handleClick}>TestButton</div>;
};

export default TestButton;
