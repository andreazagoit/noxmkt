"use client";
import React from "react";
import { Button } from "./ui/button";

type TestEmailButtonProps = {
  token: string;
};

const TestEmailButton = ({ token }: TestEmailButtonProps) => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: "andreazago1997@gmail.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio dell'email");
      }

      const data = await response.json();
      console.log("Email inviata con successo", data);
      alert("Email inviata con successo!");
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore nell'invio dell'email.");
    }
  };

  return <Button onClick={handleClick}>Test Email</Button>;
};

export default TestEmailButton;
