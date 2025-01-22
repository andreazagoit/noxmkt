import connectDB from "@/lib/db";
import ProfileModel from "@/models/Profiles";
import ProjectModel from "@/models/Project";
import { getDataFromReq } from "@/utils/jwt";

export async function PUT(req: Request) {
  await connectDB();

  const { email, host, port, password, secure } = await req.json();
  const { project } = getDataFromReq(req);

  if (!email || !host || !port || !password) {
    return Response.json(
      { message: "Tutti i campi sono richiesti." },
      { status: 400 }
    );
  }

  try {
    const foundProject = await ProjectModel.findById(project.id);

    if (!foundProject) {
      return Response.json(
        { message: "Progetto non trovato." },
        { status: 404 }
      );
    }

    // Create the new profile with the updated schema
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

    return Response.json(
      { message: "Profilo aggiunto con successo!", profile: newProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore durante l'aggiunta del profilo:", error);
    return Response.json(
      { message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
