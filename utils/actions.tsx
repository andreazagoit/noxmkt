"use server";
import connectDB from "@/lib/db";
import ActionModel from "@/models/Action";
import { normalizeData } from "./normalizeData";

export const deleteAction = async (actionId) => {
  await connectDB();
  try {
    const deletedAction = await ActionModel.findByIdAndDelete(actionId);
    if (!deletedAction) {
      throw new Error("Campaign not found");
    }

    return normalizeData(deletedAction);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw error;
  }
};

export const addAction = async (campaignId, actionData) => {
  await connectDB();
  try {
    const newAction = new ActionModel({
      campaign: campaignId,
      ...actionData,
    });

    const savedAction = await newAction.save();
    return normalizeData(savedAction);
  } catch (error) {
    console.error("Error adding action:", error);
    throw error;
  }
};

export const getActionById = async (actionId) => {
  await connectDB();
  try {
    const foundAction = await ActionModel.findById(actionId);
    return normalizeData(foundAction);
  } catch (error) {
    console.error("Error adding action:", error);
    throw error;
  }
};
