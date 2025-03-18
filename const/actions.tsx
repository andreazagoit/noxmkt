import SendEmailActionCard from "@/components/actionCards/send-email-action-card";
import { sendSingleEmail } from "@/utils/email";
import { saveEvent } from "@/utils/event";
import { generateEmailHtml, renderBlocks } from "@/utils/export";

export const ACTIONS = {
  SEND_EMAIL: {
    name: "Invia Email",
    executeAction: async (action, campaignId, profile, blocksList) => {
      const blocks = action.data.blocks;
      try {
        const textContent = renderBlocks(blocks, blocksList, "text");
        const htmlContent = generateEmailHtml(
          renderBlocks(blocks, blocksList, "html")
        );

        const result = await sendSingleEmail(
          profile,
          "andreazago1997@gmail.com",
          {
            title: action.data.title,
            text: textContent,
            html: htmlContent,
            actionId: action._id,
          }
        );

        await saveEvent(action._id, campaignId, "SENT", {});

        if (result.success) {
          action.status = "completed";
          await action.save();
          console.log("Email inviata con successo:", action.data.title);
        } else {
          console.error("Errore durante l'invio dell'email:", result.error);
        }
      } catch (error) {
        console.error("Errore nell'invio dell'email:", error);
      }
    },
    actionCard: (action) => <SendEmailActionCard action={action} />,
  },
};

export type ActionsType = keyof typeof ACTIONS;
