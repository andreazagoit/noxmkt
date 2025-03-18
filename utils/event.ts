"use server";
import connectDB from "@/lib/db";
import ActionModel from "@/models/Action";
import EventModel from "@/models/Event";

export const saveEvent = async (actionId, contactId, type, data) => {
  try {
    // Verifica se l'azione esiste
    const action = await ActionModel.findById(actionId);
    if (!action) {
      throw new Error("Action not found");
    }

    // Crea un nuovo evento
    const newEvent = new EventModel({
      action: actionId,
      contact: contactId,
      type,
      data,
    });

    // Salva l'evento nel database
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    console.error("Error adding event:", error);
    throw new Error("Failed to add event");
  }
};

export const countEvent = async (action: string, type: "SENT" | "OPENED") => {
  await connectDB();
  const count = await EventModel.countDocuments({ action, type });
  return count;
};
