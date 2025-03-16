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
      <div className="w-full flex gap-4 justify-between items-center">
        <h3 className="font-bold uppercase">Invia Email</h3>
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
      </div>
      <CardDescription className="grid grid-cols-2 justify-between w-full">
        <p className="uppercase">{action.data.title}</p>
        <p>{JSON.stringify(action.data)}</p>
      </CardDescription>
    </Card>
  );
};

export default SendEmailActionCard;
