"use server";
import { z } from "zod";
import ContactModel from "@/models/Contact";
import ProjectModel from "@/models/Project";
import connectDB from "@/lib/db";
import { normalizeData } from "./normalizeData";
import validator from "validator";

export async function getContacts(projectId: string) {
  try {
    const foundProject = await ProjectModel.findById(projectId).populate(
      "contacts",
      null,
      ContactModel
    );
    return foundProject.contacts;
  } catch (error) {
    console.error("Errore durante l'ottenimento dei contatti", error);
    throw new Error("Errore durante l'ottenimento dei contatti");
  }
}

export async function addContact(
  projectId: string,
  {
    name,
    email,
    phone,
    tags = [],
  }: {
    name: string;
    email: string;
    phone?: string;
    tags?: string[];
  }
) {
  // Define Zod schema for validation
  const contactSchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio."),
    email: z
      .string()
      .min(1, "L'email è obbligatoria.")
      .refine((value) => validator.isEmail(value), {
        message: "Email non valida.",
      }),
    phone: z
      .string()
      .optional()
      .refine((value) => !value || validator.isMobilePhone(value, "any"), {
        message: "Numero di telefono non valido.",
      }),
    tags: z.array(z.string()).optional(),
  });

  const projectSchema = z
    .string()
    .nonempty("Il campo 'projectId' è obbligatorio.");

  try {
    // Validate input
    const validContact = contactSchema.parse({ name, email, phone, tags });
    const validProjectId = projectSchema.parse(projectId);

    // Connect to the database
    await connectDB();

    // Create a new contact
    const newContact = new ContactModel(validContact);
    const savedContact = await newContact.save();

    // Find the project and update its contacts array
    const project = await ProjectModel.findById(validProjectId);
    if (!project) {
      throw new Error("Progetto non trovato");
    }

    project.contacts.push(savedContact._id);
    await project.save();

    return normalizeData(savedContact);
  } catch (error) {
    console.error("Errore durante l'aggiunta del contatto:", error);
    throw new Error(
      error instanceof z.ZodError
        ? error.errors[0].message
        : "Errore durante l'aggiunta del contatto."
    );
  }
}

export async function deleteContact(contactId: string) {
  console.log("deleting...", contactId);
  const deleteSchema = z
    .string()
    .nonempty("Il campo 'contactId' è obbligatorio.");
  const validContactId = deleteSchema.parse(contactId);

  try {
    await connectDB();
    const deletedContact = await ContactModel.findOneAndDelete({
      _id: validContactId,
    });
    return normalizeData(deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Error deleting contact");
  }
}
