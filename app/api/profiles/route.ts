import connectDB from "@/lib/db";
import { getDataFromReq } from "@/utils/jwt";
import { getProfiles } from "@/utils/profiles";

export async function POST(req: Request) {
  await connectDB();

  const { project } = getDataFromReq(req);

  try {
    const profiles = await getProfiles(project.id);

    return Response.json({ profiles }, { status: 200 });
  } catch (error) {
    console.error("Errore durante il recupero dei profili:", error);
    return Response.json(
      { message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
