"use server";
import ProfileModel from "@/models/Profiles";
import ProjectModel from "@/models/Project";
import { normalizeData } from "./normalizeData";
import connectDB from "@/lib/db";

export const getProfiles = async (projectId: string) => {
  await connectDB();
  // Query profiles by project reference
  const profiles = await ProfileModel.find({ project: projectId });
  return normalizeData(profiles);
};

export const getDefaultProfile = async (projectId: string) => {
  await connectDB();

  // Query profiles for the given project and default = true
  const defaultProfile = await ProfileModel.findOne({
    project: projectId,
    default: true,
  });

  if (!defaultProfile) {
    throw new Error("Default profile not found");
  }

  return normalizeData(defaultProfile);
};

export const addProfile = async (
  projectId: string,
  { name, email, host, port, password, secure, default: isDefault }: any
) => {
  try {
    await connectDB();

    if (isDefault) {
      await ProfileModel.updateMany(
        { project: projectId, default: true },
        { default: false }
      );
    }

    const newProfile = new ProfileModel({
      project: projectId,
      name,
      email,
      host,
      port,
      password,
      secure,
      default: isDefault,
    });

    await newProfile.save();

    return normalizeData(newProfile);
  } catch (error) {
    console.error("Error adding profile:", error);
    throw new Error("Failed to add profile");
  }
};

export const deleteProfile = async (projectId: string, profileId: string) => {
  await connectDB();

  const foundProject = await ProjectModel.findById(projectId);
  if (!foundProject) {
    throw new Error("Project not found");
  }

  // Find the profile to delete
  const profileToDelete = await ProfileModel.findById(profileId);
  if (!profileToDelete) {
    throw new Error("Profile not found");
  }

  // If the profile to delete is the default, we need to set a new default
  if (profileToDelete.default) {
    const remainingProfiles = await ProfileModel.find({ project: projectId });

    // Find a new default profile, set it to true
    const newDefaultProfile = remainingProfiles.find(
      (profile: any) => profile._id.toString() !== profileId
    );

    if (newDefaultProfile) {
      newDefaultProfile.default = true;
      await newDefaultProfile.save();
    } else {
      // If no other profile is available, you might want to throw an error or handle it differently
      throw new Error("No profiles left to set as default.");
    }
  }

  // Delete the profile
  await ProfileModel.findByIdAndDelete(profileId);

  return normalizeData(profileToDelete);
};

export const setDefaultProfile = async (profileId: string) => {
  await connectDB();

  const foundProfile = await ProfileModel.findById(profileId);
  if (!foundProfile) {
    throw new Error("Profile not found");
  }

  await ProfileModel.updateMany(
    { project: foundProfile.project, default: true },
    { default: false }
  );

  // Set new profile as default
  foundProfile.default = true;
  await foundProfile.save();

  return normalizeData(foundProfile);
};
