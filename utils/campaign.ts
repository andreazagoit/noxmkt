"use server";
import { ACTIONS } from "@/const/actions";
import connectDB from "@/lib/db";
import ActionModel from "@/models/Action";
import CampaignModel from "@/models/Campaign";
import { getContacts } from "./contact";
import { normalizeData } from "./normalizeData";
import { getDefaultProfile } from "./profiles";

export const addCampaign = async (projectId, data: { name: string }) => {
  await connectDB();
  const { name } = data;
  try {
    const newCampaign = new CampaignModel({
      project: projectId,
      name,
    });

    const savedCampaign = await newCampaign.save();
    return normalizeData(savedCampaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

export const getCampaigns = async (projectId) => {
  await connectDB();
  try {
    const campaigns = await CampaignModel.find({ project: projectId }) // Updated to reflect 'project' field in schema
      .sort({ _id: -1 });
    return normalizeData(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};

export const getCampaignById = async (campaignId) => {
  await connectDB();
  try {
    const campaign = await CampaignModel.findById(campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const foundActions = await ActionModel.find({ campaign: campaignId });

    return { ...normalizeData(campaign), actions: normalizeData(foundActions) };
  } catch (error) {
    console.error("Error fetching campaign:", error);
    throw error;
  }
};

export const deleteCampaign = async (campaignId) => {
  await connectDB();
  try {
    const deletedCampaign = await CampaignModel.findByIdAndDelete(campaignId);
    if (!deletedCampaign) {
      throw new Error("Campaign not found");
    }

    await ActionModel.deleteMany({ campaign: campaignId });

    return normalizeData(deletedCampaign);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw error;
  }
};

export const startCampaign = async (campaignId) => {
  const blocksList = {
    text: {
      defaultData: {
        value: "Sample Text",
      },
      renderer: {
        html: (props) => `<p>${props.value}</p>`,
        text: (props) => `${props.value}\n`,
      },
    },
    button: {
      defaultData: {
        link: "https://example.com",
        children: "Click Me",
      },
      renderer: {
        text: (props) => `[Button: ${props.link}]`,
        html: (props) =>
          `<a href="${props.link}" target="_blank" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; text-align: center;">${props.children}</a>`,
      },
    },
    heading: {
      defaultData: {
        value: "Sample Heading",
      },
      renderer: {
        text: (props) => `[Heading: ${props.value}]`,
        html: (props) => `<h2>${props.value}</h2>`,
      },
    },
    spacer: {
      defaultData: {
        size: "32px",
      },
      renderer: {
        text: (props) => `[Spacer: ${props.size}]`,
        html: (props) => `<div style="height: ${props.size};"></div>`,
      },
    },
    separator: {
      defaultData: {},
      renderer: {
        text: (props) => "[Separator]",
        html: (props) =>
          `<hr style="margin: 16px 0; border-top: 2px solid #ccc;" />`,
      },
    },
  };

  // Fetch the campaign and related project
  const foundCampaign = await CampaignModel.findById(campaignId);

  if (!foundCampaign) {
    throw new Error("Campaign not found");
  }

  const foundProject = foundCampaign.project;
  const defaultProfile = await getDefaultProfile(foundProject._id);
  const contacts = await getContacts(foundProject._id);

  // Fetch associated actions
  const actions = await ActionModel.find({ campaign: campaignId });

  for (const action of actions) {
    const actionHandler = ACTIONS[action.type];
    if (actionHandler && actionHandler.executeAction) {
      await actionHandler.executeAction(
        action,
        campaignId,
        defaultProfile,
        blocksList
      );
    }
  }

  await foundCampaign.save();

  return normalizeData(foundCampaign);
};
