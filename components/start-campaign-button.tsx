"use client";

import { startCampaign } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "./ui/button";

type StartCampaignButtonProps = {
  campaignId: string;
  disabled?: boolean;
};

const StartCampaignButton = ({
  campaignId,
  disabled,
}: StartCampaignButtonProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    const startedCampaign = await startCampaign(campaignId);
    if (startedCampaign) {
      router.refresh();
      toast("Campagna completata");
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={disabled}>
      <FaPlay />
      Avvia Campagna
    </Button>
  );
};

export default StartCampaignButton;
