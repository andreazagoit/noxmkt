import connectDB from "@/lib/db";
import { getContacts } from "@/utils/contact";
import { getDataFromReq } from "@/utils/jwt";

export async function POST(req: Request) {
  await connectDB();

  const data = getDataFromReq(req);

  try {
    const contacts = await getContacts(data.project.id);
    return Response.json({ success: true, contacts }, { status: 200 });
  } catch (error) {
    console.error("Errore nella route API POST:", error);
    return Response.json(
      { success: false, message: "Errore interno al server." },
      { status: 500 }
    );
  }
}
