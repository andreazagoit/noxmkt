"use server";
import ProfileModel from "@/models/Profiles";
import ProjectModel from "@/models/Project";
import { normalizeData } from "./normalizeData";
import connectDB from "@/lib/db";

export const getProfiles = async (projectId: string) => {
  await connectDB();
  const foundProject = await ProjectModel.findById(projectId).populate(
    "profiles",
    null,
    ProfileModel
  );
  return normalizeData(foundProject.profiles);
};

export const addProfile = async (
  projectId: string,
  { email, host, port, password, secure }: any
) => {
  await connectDB();
  const foundProject = await ProjectModel.findById(projectId);

  const newProfile = new ProfileModel({
    email,
    host,
    port,
    password,
    secure,
  });

  await newProfile.save();

  foundProject.profiles.push(newProfile._id);
  await foundProject.save();

  return normalizeData(newProfile);
};

export const deleteProfile = async (projectId: string, profileId: string) => {
  await connectDB();

  const foundProject = await ProjectModel.findById(projectId);
  if (!foundProject) {
    throw new Error("Project not found");
  }

  foundProject.profiles = foundProject.profiles.filter(
    (id: any) => id.toString() !== profileId
  );
  await foundProject.save();

  const deletedProfile = await ProfileModel.findByIdAndDelete(profileId);
  if (!deletedProfile) {
    throw new Error("Profile not found");
  }

  return normalizeData(deletedProfile);
};
