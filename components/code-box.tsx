"use client";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type CodeBoxProps = {
  value: string;
};

const CodeBox = ({ value }: CodeBoxProps) => {
  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast("Token copiato negli appunti!");
    } catch (error) {
      toast("Errore durante la copia del token.");
    }
  };

  return (
    <div className="w-full p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow">
      <div className="overflow-hidden">
        <p className="break-all font-mono text-sm text-gray-800 mb-4">
          {value}
        </p>
      </div>
      <Button onClick={handleCopyToken} variant={"outline"}>
        Copy token
      </Button>
    </div>
  );
};

export default CodeBox;
