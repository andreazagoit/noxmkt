"use client";
import { ACTIONS } from "@/const/actions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { toast } from "sonner";
import DeleteCampaignButton from "./delete-campaign-button";
import GoBackButton from "./go-back-button";
import OpenEmailEditorButton from "./open-email-editor-button";
import RefreshPageButton from "./refresh-page-button";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Container from "./ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Nav from "./ui/nav";
import { addAction } from "@/utils/actions";
import StartCampaignButton from "./start-campaign-button";

const CampaignActions = ({ projectId, campaign, campaignId }) => {
  const [dialog, setDialog] = useState<undefined | "add_email">();
  const [actions, setActions] = useState([...campaign.actions]);
  const router = useRouter();

  const handleAddAction = async (data: any) => {
    const newAction = await addAction(campaignId, data);
    setDialog(undefined);
    router.refresh();
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
          <h2 className="text-4xl sm:text-6xl font-semibold my-8 mt-6">
            {campaign.name}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
              <div key={i}>{ACTIONS.SEND_EMAIL.actionCard(action)}</div>
            ))}
          </div>
        </div>
        <Nav className="justify-end md:justify-between">
          <DeleteCampaignButton campaignId={campaignId} />
          <div className="flex gap-4">
            <StartCampaignButton campaignId={campaignId} />
          </div>
        </Nav>
      </Container>
      <OpenEmailEditorButton
        open={dialog === "add_email"}
        onDimiss={() => setDialog(undefined)}
        onSave={handleAddAction}
        projectId={projectId}
      />
    </>
  );
};

export default CampaignActions;
