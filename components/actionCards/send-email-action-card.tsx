"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteAction } from "@/utils/actions";
import { countEvent } from "@/utils/event";

const SendEmailActionCard = ({ action }) => {
  const router = useRouter();
  const [sentCount, setSentCount] = useState(null);
  const [openedCount, setOpenedCount] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const sentResult = await countEvent(action, "SENT");
      const openedResult = await countEvent(action, "OPENED");
      setSentCount(sentResult);
      setOpenedCount(openedResult);
    };

    fetchCounts();
  }, [action]);

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
      <CardDescription className="grid grid-cols-3 justify-between w-full">
        <p className="uppercase">{action.data.title}</p>
        <p>{JSON.stringify(action.data)}</p>
        <p>Stato: {action.status}</p>
        <p>Email inviate: {sentCount}</p>
        <p>Email aperte: {openedCount}</p>
      </CardDescription>
    </Card>
  );
};

export default SendEmailActionCard;
