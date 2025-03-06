import AddCampaignAction from "@/components/add-campaign-action";
import DeleteCampaignButton from "@/components/delete-campaign-button";
import GoBackButton from "@/components/go-back-button";
import StartCampaignButton from "@/components/start-campaign-button";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Nav from "@/components/ui/nav";
import { getCampaignById } from "@/utils/campaign";

type CampaignPageProps = {
  params: Promise<{ projectId: string; campaignId: string }>;
};

const CampaignPage = async ({ params }: CampaignPageProps) => {
  const { projectId, campaignId } = await params;

  const campaign = await getCampaignById(campaignId);

  if (!campaign) return null;

  return (
    <Container className="flex-1 flex flex-col">
      <div className="flex flex-col flex-1">
        <Nav className="justify-between">
          <GoBackButton />
          <div className="flex gap-4">
            <AddCampaignAction />
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
        <StartCampaignButton projectId={projectId} campaignId={campaignId} />
      </Nav>
    </Container>
  );
};

export default CampaignPage;
