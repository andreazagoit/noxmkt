import connectDB from "@/lib/db";
import { getProjects } from "@/utils/project";

export async function POST(req: Request) {
  await connectDB();

  const { owner } = await req.json();

  try {
    const projects = await getProjects(owner);
    return Response.json(
      { success: true, message: "Progetti recuperati con successo.", projects },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore nella route API:", error);
    return Response.json(
      { success: false, message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
