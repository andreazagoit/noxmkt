import CampaignActions from "@/components/campaign-actions";
import { getCampaignById } from "@/utils/campaign";

type CampaignPageProps = {
  params: Promise<{ projectId: string; campaignId: string }>;
};

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
