import CampaignActions from "@/components/campaign-actions";
import { getCampaignById } from "@/utils/campaign";
import { Metadata } from "next";

type CampaignPageProps = {
  params: Promise<{ projectId: string; campaignId: string }>;
};

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { campaignId } = await params;
  const campaign = await getCampaignById(campaignId);

  if (!campaign) {
    return {
      title: "Campagna non trovata",
      description: "La campagna richiesta non è stata trovata.",
    };
  }

  return {
    title: `${campaign.name} | NoxisFlow`,
    description: "test",
  };
}

const CampaignPage = async ({ params }: CampaignPageProps) => {
  const { projectId, campaignId } = await params;

  const campaign = await getCampaignById(campaignId);

  if (!campaign) return null;

  return (
    <CampaignActions
      projectId={projectId}
      campaignId={campaignId}
      campaign={campaign}
    />
  );
};

export default CampaignPage;
