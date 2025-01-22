import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { createProject, getProjectById } from "@/utils/project";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return Response.json(
        { success: false, message: "Il campo 'projectId' è obbligatorio." },
        { status: 400 }
      );
    }

    const project = await getProjectById(projectId);

    if (!project) {
      return Response.json(
        { success: false, message: "Progetto non trovato." },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Progetto recuperato con successo.",
        project,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore nella route API POST:", error);
    return Response.json(
      { success: false, message: "Errore interno al server." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await auth();

  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return Response.json(
        {
          success: false,
          message: "Il campo 'name' è obbligatorio e deve essere una stringa.",
        },
        { status: 400 }
      );
    }

    const project = await createProject(name, session!.user!.email!);

    return Response.json(
      {
        success: true,
        message: "Progetto creato con successo.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore nella route API PUT:", error);
    return Response.json(
      { success: false, message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
