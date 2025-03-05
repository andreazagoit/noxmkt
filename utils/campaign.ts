"use server";
import CampaignModel from "@/models/Campaign";
import { normalizeData } from "./normalizeData";
import connectDB from "@/lib/db";

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
