"use server";

import connectDB from "@/lib/db";
import ProjectModel from "@/models/Project";
import { generateToken } from "./jwt";
import { normalizeData } from "./normalizeData";
import ContactModel from "@/models/Contact";

export async function getProjects(owner: string) {
  try {
    await connectDB();
    const projects = await ProjectModel.find({ owner });
    return projects;
  } catch (error) {
    console.error("Errore durante il recupero dei progetti:", error);
    throw new Error("Errore durante il recupero dei progetti.");
  }
}

export async function getProjectById(projectId: string) {
  try {
    await connectDB();
    const project = await ProjectModel.findById(projectId);

    return normalizeData(project);
  } catch (error) {
    console.error("Errore durante il recupero del progetto:", error);
    throw new Error("Errore durante il recupero del progetto.");
  }
}

export async function getProjectData(projectId: string) {
  const contacts = await ContactModel.find({ project: projectId });

  return {
    audienceCount: contacts.length,
  };
}

export async function createProject(name: string, userEmail: string) {
  try {
    await connectDB();

    const newProject = new ProjectModel({ name, owner: userEmail });

    newProject.token = generateToken({
      project: {
        id: newProject._id,
        name: newProject.name,
      },
    });

    await newProject.save();

    return newProject;
  } catch (error) {
    console.error("Errore durante la creazione del progetto:", error);
    throw new Error("Errore durante la creazione del progetto.");
  }
}
