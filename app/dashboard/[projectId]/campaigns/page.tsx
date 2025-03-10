import React from "react";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import NewCampaign from "@/components/new-campaign";
import { getCampaigns } from "@/utils/campaign";
import Link from "next/link";
import Nav from "@/components/ui/nav";
import { Badge } from "@/components/ui/badge";

// Oggetto con azioni come funzioni
const ActionTypes = {
  SEND_EMAIL: (props) => {
    console.log("Sending email to", props);
  },
  UPDATE_LANDING_PAGE: (props: { url: string; updateText: string }) => {
    console.log("Updating landing page:", props);
  },
  PREPARE_IMAGES: (props: { imagesToPrepare: number }) => {
    console.log("Preparing", props.imagesToPrepare, "images");
  },
  SET_UP_EMAIL_TRIGGER: (props: { triggerType: string }) => {
    console.log("Setting up email trigger for", props.triggerType);
  },
  CREATE_NEW_SUBJECT_LINE: (props: { subject: string }) => {
    console.log("Creating new subject line:", props.subject);
  },
  SEND_REMINDER_EMAIL: (props: {
    subject: string;
    recipient: string;
    body: string;
  }) => {
    console.log("Sending reminder email to", props.recipient, props);
  },
} as const;

type ActionType = keyof typeof ActionTypes;

type Action = {
  id: string;
  type: ActionType;
  data?: any;
};

type Campaign = {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  actions: Action[];
};

type Automation = {
  id: string;
  name: string;
  trigger: string;
  status: "active" | "paused" | "completed";
  actions: Action[];
};

const CampaignsPage = async ({ params }) => {
  const { projectId } = await params;

  const campaigns = await getCampaigns(projectId);

  /* const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Campaign 1",
      status: "active",
      actions: [
        {
          id: "1",
          type: "SEND_EMAIL",
          data: {
            subject: "Welcome to the campaign",
            recipient: "user@example.com",
            body: "Hello, thank you for joining our campaign!",
          },
        },
        {
          id: "2",
          type: "UPDATE_LANDING_PAGE",
          data: {
            url: "https://example.com/landing-page",
            updateText: "Special promotion now live!",
          },
        },
      ],
    },
    {
      id: "2",
      name: "Campaign 2",
      status: "paused",
      actions: [
        {
          id: "3",
          type: "PREPARE_IMAGES",
          data: {
            imagesToPrepare: 5,
          },
        },
      ],
    },
  ]); */

  /* const [automations, setAutomations] = useState<Automation[]>([
    {
      id: "1",
      name: "Welcome Series",
      trigger: "Sign Up",
      status: "active",
      actions: [
        {
          id: "4",
          type: "SEND_EMAIL",
          data: {
            subject: "Welcome aboard!",
            recipient: "newuser@example.com",
            body: "Thanks for signing up for our service.",
          },
        },
      ],
    },
    {
      id: "2",
      name: "Abandoned Cart",
      trigger: "Cart Abandonment",
      status: "paused",
      actions: [
        {
          id: "5",
          type: "SEND_REMINDER_EMAIL",
          data: {
            subject: "You left something behind",
            recipient: "user@example.com",
            body: "Don't forget to complete your purchase!",
          },
        },
      ],
    },
  ]); */

  /* const handleCreateCampaign = () => {
    const newCampaign: Campaign = {
      id: (campaigns.length + 1).toString(),
      name: "New Campaign",
      status: "active",
      actions: [
        {
          id: "6",
          type: "CREATE_NEW_SUBJECT_LINE",
          data: {
            subject: "New Offer Coming Soon!",
          },
        },
      ],
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleCreateAutomation = () => {
    const newAutomation: Automation = {
      id: (automations.length + 1).toString(),
      name: "New Automation",
      trigger: "New Trigger",
      status: "active",
      actions: [
        {
          id: "7",
          type: "SET_UP_EMAIL_TRIGGER",
          data: {
            triggerType: "Email Sent",
          },
        },
      ],
    };
    setAutomations([...automations, newAutomation]);
  };

  const handleExecuteActions = () => {
    [...campaigns, ...automations].forEach((item) => {
      item.actions.forEach(executeAction);
    });
  };

  const executeAction = (action: Action) => {
    const actionType = ActionTypes[action.type];
    console.log(`Executing action: ${action.type}`, action.data);
    actionType(action.data);
  }; */

  return (
    <Container>
      <div className="flex flex-col">
        <div className="py-4 flex justify-end">
          <NewCampaign projectId={projectId} />
        </div>
        <h2 className="text-4xl sm:text-6xl font-semibold mb-8">Campagne</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {campaigns.map((campaign) => (
            <Link key={campaign._id} href={`campaigns/${campaign._id}`}>
              <Card className="p-4 shadow-lg rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
                    <Badge className="bg-green-500 text-white hover:bg-green-500">
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CampaignsPage;
