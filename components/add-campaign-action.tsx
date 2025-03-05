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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AddCampaignAction = () => {
  const [open, setOpen] = useState(false);

  /* const handleSubmit = async () => {
    try {
      const newCampaign = await addCampaign(projectId, { name });
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button variant="secondary">Add Action</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuova campagna</DialogTitle>
          <DialogDescription>Crea nuova campagna</DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          {/* <Button type="submit" onClick={() => handleSubmit()}>
            Crea campagna
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampaignAction;
