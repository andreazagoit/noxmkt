import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { deleteContact } from "@/utils/contact";
import { getDataFromReq } from "@/utils/jwt";
import { createProject } from "@/utils/project";
import { z } from "zod";

export async function POST(req: Request) {
  await connectDB();

  try {
    const project = getDataFromReq(req);

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

const deleteSchema = z.object({
  projectId: z.string().nonempty("Il campo 'projectId' è obbligatorio."),
});

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    const { projectId } = deleteSchema.parse(body);

    const deletedProject = await deleteContact(projectId);

    if (!deletedProject) {
      return Response.json(
        { success: false, message: "Progetto non trovato o non autorizzato." },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Progetto eliminato con successo.",
        project: deletedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: "Errore di validazione.",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Errore nella route API DELETE:", error);
    return Response.json(
      { success: false, message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
