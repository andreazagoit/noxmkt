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
  const blocksList = {
    text: {
      defaultData: {
        value: "Sample Text",
      },
      renderer: {
        html: (props) => `<p>${props.value}</p>`,
        text: (props) => `${props.value}\n`,
      },
    },
    button: {
      defaultData: {
        link: "https://example.com",
        children: "Click Me",
      },
      renderer: {
        text: (props) => `[Button: ${props.link}]`,
        html: (props) =>
          `<a href="${props.link}" target="_blank" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; text-align: center;">${props.children}</a>`,
      },
    },
    heading: {
      defaultData: {
        value: "Sample Heading",
      },
      renderer: {
        text: (props) => `[Heading: ${props.value}]`,
        html: (props) => `<h2>${props.value}</h2>`,
      },
    },
    spacer: {
      defaultData: {
        size: "32px",
      },
      renderer: {
        text: (props) => `[Spacer: ${props.size}]`,
        html: (props) => `<div style="height: ${props.size};"></div>`,
      },
    },
    separator: {
      defaultData: {},
      renderer: {
        text: (props) => "[Separator]",
        html: (props) =>
          `<hr style="margin: 16px 0; border-top: 2px solid #ccc;" />`,
      },
    },
  };

  const handleSubmit = async () => {
    try {
      const profiles = await getProfiles(projectId);
      const contacts = await getContacts(projectId);

      console.log("Azioni da eseguire:", actions);

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
    }
  };

  return <Button onClick={handleSubmit}>Avvia Campagna</Button>;
};

export default StartCampaignButton;
