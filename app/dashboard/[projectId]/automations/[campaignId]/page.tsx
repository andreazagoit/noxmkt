import DeleteCampaignButton from "@/components/delete-campaign-button";
import GoBackButton from "@/components/go-back-button";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Nav from "@/components/ui/nav";
import { getCampaignById } from "@/utils/campaign";
import React from "react";

const CampaignPage = async ({ params }) => {
  const { campaignId } = await params;

  const campaign = await getCampaignById(campaignId);

  if (!campaign) return null;

  return (
    <Container className="flex-1 flex flex-col">
      <div className="flex flex-col flex-1">
        <Nav className="justify-between">
          <GoBackButton />
          <div className="flex gap-4">
            {/* <AddCampaignAction /> */}
            <DeleteCampaignButton campaignId={campaignId} />
          </div>
        </Nav>
        <h2 className="text-4xl sm:text-6xl font-semibold mb-8">
          {campaign.name}
        </h2>
        <p>{JSON.stringify(campaign.status)}</p>
        <p>{JSON.stringify(campaign.actions)}</p>
      </div>
      <Nav className="justify-end">
        <Button variant="outline">Salva Draft</Button>
        <Button>Avvia Campagna</Button>
      </Nav>
    </Container>
  );
};

export default CampaignPage;
