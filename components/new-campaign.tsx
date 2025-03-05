"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { addCampaign } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

type NewCampaignProps = {
  projectId: string;
};

const NewCampaign = ({ projectId }: NewCampaignProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const newCampaign = await addCampaign(projectId, { name });
      router.push(`campaigns/${newCampaign._id}`);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button>Nuova campagna</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuova campagna</DialogTitle>
          <DialogDescription>Crea nuova campagna</DialogDescription>
        </DialogHeader>
        <Input name={name} onChange={(e) => setName(e.target.value)} />
        <DialogFooter>
          <Button type="submit" onClick={() => handleSubmit()}>
            Crea campagna
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaign;
