import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { sendSingleEmail } from "./email";
import { generateEmailHtml, renderBlocks } from "./export";

export const ActionTypes = {
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
    },
    actionCard: (action, onDelete) => (
      <Card className="p-4 flex flex-col gap-4 items-start">
        <CardTitle>{action.type}</CardTitle>
        <CardDescription>{JSON.stringify(action.data)}</CardDescription>
        {/* <Button variant="outline" onClick={onDelete}>
          Rimuovi
        </Button> */}
      </Card>
    ),
  },
};

export type ActionType = keyof typeof ActionTypes;
