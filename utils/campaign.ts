"use server";
import CampaignModel from "@/models/Campaign";
import { normalizeData } from "./normalizeData";
import connectDB from "@/lib/db";
import ProjectModel from "@/models/Project";
import { getProfiles } from "./profiles";
import { getContacts } from "./contact";
import { generateEmailHtml } from "./export";
import { sendSingleEmail } from "./email";
import { renderBlocks } from "@/utils/export";

export const addCampaign = async (projectId, data: { name: string }) => {
  await connectDB();
  const { name } = data;
  try {
    const newCampaign = new CampaignModel({
      projectId,
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
    const campaigns = await CampaignModel.find({ projectId }).sort({ _id: -1 });
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
    return normalizeData(campaign);
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
    return normalizeData(deletedCampaign);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw error;
  }
};

export const updateCampaignActions = async (campaignId, actions) => {
  await connectDB();
  try {
    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      campaignId,
      { $set: { actions } },
      { new: true, runValidators: true }
    );
    if (!updatedCampaign) {
      throw new Error("Campaign not found");
    }
    return normalizeData(updatedCampaign);
  } catch (error) {
    console.error("Error updating campaign:", error);
    throw error;
  }
};

export const startCampaign = async (campaignId) => {
  console.log("aaa");

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

  const foundCampaign = await CampaignModel.findById(campaignId);

  const foundProject = await ProjectModel.findById(foundCampaign.projectId);

  const foundProfiles = await getProfiles(foundCampaign.projectId);

  const contacts = await getContacts(foundCampaign.projectId);

  for (const action of foundCampaign.actions) {
    if (action.type !== "SEND_EMAIL") continue;

    const blocks = action.data.blocks;

    try {
      const textContent = renderBlocks(blocks, blocksList, "text");
      const htmlContent = generateEmailHtml(
        renderBlocks(blocks, blocksList, "html")
      );
      console.log(htmlContent, textContent);
      const result = await sendSingleEmail(
        foundProfiles[0],
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
  }

  foundCampaign.status = "completed";
  await foundCampaign.save();

  return normalizeData(foundCampaign);
};
