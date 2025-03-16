"use client";
import React from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteAction } from "@/utils/actions";

const SendEmailActionCard = ({ action }) => {
  const router = useRouter();

  return (
    <Card className="p-4 flex flex-col gap-4 items-start">
      <CardTitle>{action.type}</CardTitle>
      <CardDescription>{JSON.stringify(action.data)}</CardDescription>
      <Button
        variant="outline"
        onClick={async () => {
          const deletedAction = await deleteAction(action._id);
          console.log(deletedAction);

          router.refresh();
        }}
      >
        Rimuovi
      </Button>
    </Card>
  );
};

export default SendEmailActionCard;
