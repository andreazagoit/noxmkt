"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteCampaign } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";

type DeleteCampaignButtonProps = {
  campaignId: string;
};

const DeleteCampaignButton = ({ campaignId }: DeleteCampaignButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const deletedCampaign = await deleteCampaign(campaignId);
    if (deleteCampaign) {
      toast(`Eliminiazione campagna ${deletedCampaign.name} riuscita`);
      router.back();
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      className="hidden md:flex"
    >
      <MdDelete />
      Elimina campagna
    </Button>
  );
};

export default DeleteCampaignButton;
