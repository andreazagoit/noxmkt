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
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    address,
    language,
    tags = [],
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthDate?: Date;
    address?: string;
    language?: string;
    tags?: string[];
  }
) {
  // Define Zod schema for validation
  const contactSchema = z.object({
    firstName: z.string().min(1, "Il nome è obbligatorio."),
    lastName: z.string().min(1, "Il cognome è obbligatorio."),
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
    birthDate: z
      .instanceof(Date)
      .optional()
      .refine((value) => !value || validator.isDate(value.toString()), {
        message: "Data di nascita non valida.",
      }),
    address: z.string().optional(),
    language: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

  const projectSchema = z
    .string()
    .nonempty("Il campo 'projectId' è obbligatorio.");

  try {
    // Validate input
    const validContact = contactSchema.parse({
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      address,
      language,
      tags,
    });
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

export async function patchContact(
  contactId: string,
  {
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    address,
    language,
    tags,
  }: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    address?: string;
    language?: string;
    tags?: string[];
  }
) {
  // Define Zod schema for validation
  const contactSchema = z.object({
    firstName: z.string().min(1, "Il nome è obbligatorio.").optional(),
    lastName: z.string().min(1, "Il cognome è obbligatorio.").optional(),
    email: z
      .string()
      .min(1, "L'email è obbligatoria.")
      .refine((value) => validator.isEmail(value), {
        message: "Email non valida.",
      })
      .optional(),
    phone: z
      .string()
      .optional()
      .refine((value) => !value || validator.isMobilePhone(value, "any"), {
        message: "Numero di telefono non valido.",
      }),
    birthDate: z
      .instanceof(Date)
      .optional()
      .refine((value) => !value || validator.isDate(value.toString()), {
        message: "Data di nascita non valida.",
      }),
    address: z.string().optional(),
    language: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

  const contactIdSchema = z
    .string()
    .nonempty("Il campo 'contactId' è obbligatorio.");

  try {
    // Validate input
    const validContactId = contactIdSchema.parse(contactId);
    const validContact = contactSchema.parse({
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      address,
      language,
      tags,
    });

    // Connect to the database
    await connectDB();

    // Find the contact by ID
    const contact = await ContactModel.findById(validContactId);
    if (!contact) {
      throw new Error("Contatto non trovato");
    }

    // Update the contact fields if they are provided
    if (validContact.firstName) contact.firstName = validContact.firstName;
    if (validContact.lastName) contact.lastName = validContact.lastName;
    if (validContact.email) contact.email = validContact.email;
    if (validContact.phone) contact.phone = validContact.phone;
    if (validContact.birthDate) contact.birthDate = validContact.birthDate;
    if (validContact.address) contact.address = validContact.address;
    if (validContact.language) contact.language = validContact.language;
    if (validContact.tags) contact.tags = validContact.tags;

    // Save the updated contact
    const updatedContact = await contact.save();

    return normalizeData(updatedContact);
  } catch (error) {
    console.error("Errore durante l'aggiornamento del contatto:", error);
    throw new Error(
      error instanceof z.ZodError
        ? error.errors[0].message
        : "Errore durante l'aggiornamento del contatto."
    );
  }
}
