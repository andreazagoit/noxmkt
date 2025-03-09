"use client";

import React from "react";
import { Button } from "./ui/button";
import { getProfiles } from "@/utils/profiles";
import { getContacts } from "@/utils/contact";
import { sendSingleEmail } from "@/utils/email";
import { renderBlocks } from "./email-composer";
import { generateEmailHtml } from "@/utils/export";
import ComposerWrapper from "./composer/composer-wrapper";
import { DraggableTypes } from "./draggable-block";
import { startCampaign, updateCampaignActions } from "@/utils/campaign";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type StartCampaignButtonProps = {
  projectId: string;
  campaignId: string;
  actions: any[];
};

const StartCampaignButton = ({
  projectId,
  campaignId,
  actions,
}: StartCampaignButtonProps) => {
  const router = useRouter();
  const handleSubmit = async () => {
    const savedCampaign = await updateCampaignActions(campaignId, actions);
    const startedCampaign = await startCampaign(campaignId);
    router.refresh();
    toast("Campagna completata");

    /* try {
      const profiles = await getProfiles(projectId);
      const contacts = await getContacts(projectId);


      for (const action of actions) {
        if (action.type !== "SEND_EMAIL") continue;

        const blocks = action.data.blocks;

        try {
          const textContent = renderBlocks(blocks, blocksList, "text");
          const htmlContent = generateEmailHtml(
            renderBlocks(blocks, blocksList, "html")
          );
          console.log(htmlContent, textContent);
          const result = await sendSingleEmail(
            profiles[0],
            "andreazago1997@gmail.com",
            {
              title: action.data.title,
              text: textContent,
              html: htmlContent,
              campaignId,
            }
          );

          if (result.success) {
            console.log("Email inviata con successo:", action.data.title);
          } else {
            console.error("Errore durante l'invio dell'email:", result.error);
          }
        } catch (error) {
          console.error("Errore nell'invio dell'email:", error);
        }
      }

      console.log("Campagna completata!");
    } catch (error) {
      console.error("Errore nell'avvio della campagna:", error);
    } */
  };

  return <Button onClick={handleSubmit}>Avvia Campagna</Button>;
};

export default StartCampaignButton;
