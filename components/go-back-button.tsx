"use client";
import React from "react";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()}>
      <FaArrowLeft />
      Indietro
    </Button>
  );
};

export default GoBackButton;
