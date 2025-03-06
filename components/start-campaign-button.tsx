"use client";

import React from "react";
import { Button } from "./ui/button";
import { getProfiles } from "@/utils/profiles";
import { getContacts } from "@/utils/contact";
import { sendSingleEmail } from "@/utils/email";

type StartCampaignButtonProps = {
  projectId: string;
  campaignId: string;
};

const StartCampaignButton = ({
  projectId,
  campaignId,
}: StartCampaignButtonProps) => {
  const handleSubmit = async () => {
    const profiles = await getProfiles(projectId);
    const contacts = await getContacts(projectId);

    const result = await sendSingleEmail(
      profiles[0],
      "andreazago1997@gmail.com",
      {
        title: "test",
        text: "email di test",
        html: "<div><h1>Test email</h1></div>",
        campaignId,
      }
    );

    if (result.success) {
      console.log("Campagna avviata con successo");
    } else {
      console.error("Errore durante l'avvio della campagna:", result.error);
    }
  };

  return <Button onClick={handleSubmit}>Avvia Campagna</Button>;
};

export default StartCampaignButton;
