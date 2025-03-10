"use client";
import { cn } from "@/lib/utils";
import { updateCampaignActions } from "@/utils/campaign";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { toast } from "sonner";
import DeleteCampaignButton from "./delete-campaign-button";
import GoBackButton from "./go-back-button";
import OpenEmailEditorButton from "./open-email-editor-button";
import RefreshPageButton from "./refresh-page-button";
import StartCampaignButton from "./start-campaign-button";
import { Button } from "./ui/button";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Container from "./ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Nav from "./ui/nav";

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
              <RefreshPageButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FaPlus />
                    Aggiungi azione
                  </Button>
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
            </div>
          </Nav>
          <h2 className="text-4xl sm:text-6xl font-semibold my-8">
            {campaign.name}
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">
                Email Inviate
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                1243
              </span>
            </Card>

            <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">
                Tasso di apertura:
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                1243
              </span>
            </Card>
            <Card className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">Active User</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                1243
              </span>
            </Card>
            <Card
              className={cn(
                "flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:px-8 sm:py-6"
              )}
            >
              <span className="text-xs text-muted-foreground">Stato</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {campaign.status === "draft" && "Bozza"}
                {campaign.status === "completed" && "Completato"}
              </span>
            </Card>
          </div>
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
        <Nav>
          <DeleteCampaignButton campaignId={campaignId} />
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleSaveDraft}>
              <MdSaveAlt />
              Salva Draft
            </Button>
            <StartCampaignButton
              projectId={projectId}
              campaignId={campaignId}
              actions={actions}
            />
          </div>
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
