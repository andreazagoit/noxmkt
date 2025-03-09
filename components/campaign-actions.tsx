"use client";
import { useState } from "react";
import DeleteCampaignButton from "./delete-campaign-button";
import GoBackButton from "./go-back-button";
import OpenEmailEditorButton from "./open-email-editor-button";
import StartCampaignButton from "./start-campaign-button";
import { Button } from "./ui/button";
import Container from "./ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Nav from "./ui/nav";
import { sendSingleEmail } from "@/utils/email";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { updateCampaignActions } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CampaignActions = ({ projectId, campaign, campaignId }) => {
  const [dialog, setDialog] = useState<undefined | "add_email">();
  const [actions, setActions] = useState([...campaign.actions]);
  const router = useRouter();

  const handleAddEmailAction = (data: any) => {
    setActions((state) => [...state, { type: "SEND_EMAIL", data }]);
    setDialog(undefined);
  };

  const handleDeleteAction = (index: number) => {
    setActions((prevActions) => prevActions.filter((_, i) => i !== index));
  };

  const handleSaveDraft = async () => {
    try {
      await updateCampaignActions(campaignId, actions);
      toast("Campagna salvata");
      router.back();
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft");
    }
  };

  return (
    <>
      <Container className="flex-1 flex flex-col">
        <div className="flex flex-col flex-1">
          <Nav className="justify-between">
            <GoBackButton />
            <div className="flex gap-4">
              <p>{campaign.status}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Aggiungi azione</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setDialog("add_email")}>
                      Invio Email
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>Invio Whatsapp</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteCampaignButton campaignId={campaignId} />
            </div>
          </Nav>
          <h2 className="text-4xl sm:text-6xl font-semibold mb-8">
            {campaign.name}
          </h2>
          <div className="flex flex-col gap-4">
            {actions.map((action, i) => (
              <Card className="p-4 flex flex-col gap-4 items-start" key={i}>
                <CardTitle>{action.type}</CardTitle>
                <CardDescription>{JSON.stringify(action.data)}</CardDescription>
                <Button variant="outline" onClick={() => handleDeleteAction(i)}>
                  Rimuovi
                </Button>
              </Card>
            ))}
          </div>
        </div>
        <Nav className="justify-end">
          <Button variant="outline" onClick={handleSaveDraft}>
            Salva Draft
          </Button>
          <StartCampaignButton
            projectId={projectId}
            campaignId={campaignId}
            actions={actions}
          />
        </Nav>
      </Container>
      <OpenEmailEditorButton
        open={dialog === "add_email"}
        onDimiss={() => setDialog(undefined)}
        onSave={handleAddEmailAction}
        projectId={projectId}
      />
    </>
  );
};

export default CampaignActions;
