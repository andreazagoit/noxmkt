"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteCampaign } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteCampaignButtonProps = {
  campaignId: string;
};

const DeleteCampaignButton = ({ campaignId }: DeleteCampaignButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const deletedCampaign = await deleteCampaign(campaignId);
    toast(`Eliminiazione campagna ${deletedCampaign.name} riuscita`);
    router.back();
  };

  return (
    <Button variant="outline" onClick={handleDelete}>
      Elimina campagna
    </Button>
  );
};

export default DeleteCampaignButton;
