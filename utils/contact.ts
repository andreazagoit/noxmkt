"use server";
import connectDB from "@/lib/db";
import ContactModel from "@/models/Contact";
import contactValidator from "@/validators/contact";
import { z } from "zod";
import { normalizeData } from "./normalizeData";

export async function getContacts(projectId: string) {
  await connectDB();
  try {
    const foundContacts = await ContactModel.find({ project: projectId });

    console.log(foundContacts);
    return normalizeData(foundContacts) || [];
  } catch (error) {
    console.error("Errore durante l'ottenimento dei contatti", error);
    throw new Error("Errore durante l'ottenimento dei contatti");
  }
}

export async function getContactByHash(emailHash: string) {
  await connectDB();
  return await ContactModel.findOne({ emailHash });
}

export async function addContact(
  projectId: string,
  data: {
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
  const {
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    address,
    language,
    tags = [],
  } = data;

  try {
    // Validate input
    const validContact = contactValidator.parse(data);

    // Connect to the database
    await connectDB();

    // Create a new contact
    const newContact = new ContactModel({
      project: projectId,
      ...validContact,
    });

    const savedContact = await newContact.save();

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
  try {
    await connectDB();
    const deletedContact = await ContactModel.findOneAndDelete({
      _id: contactId,
    });
    return normalizeData(deletedContact);
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Error deleting contact");
  }
}

export async function patchContact(
  contactId: string,
  data: {
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
  const contactIdSchema = z
    .string()
    .nonempty("Il campo 'contactId' è obbligatorio.");

  try {
    // Validate input
    const validContactId = contactIdSchema.parse(contactId);
    const validContact = contactValidator.parse(data);

    // Connect to the database
    await connectDB();

    // Find the contact by ID
    const contact = await ContactModel.findById(validContactId);
    if (!contact) {
      throw new Error("Contatto non trovato");
    }

    // Update the contact fields only if they are provided
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
