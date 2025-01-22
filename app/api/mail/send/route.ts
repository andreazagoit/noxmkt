import { sendEmail } from "@/utils/email";
import { getDataFromReq } from "@/utils/jwt";

export async function POST(req: Request) {
  const { email } = await req.json();

  const project = getDataFromReq(req);

  if (!email) {
    return Response.json(
      { message: "Dati non validi. name ed email sono richiesti." },
      { status: 400 }
    );
  }

  try {
    /* const project = await ProjectModel.findById(projectId);
    if (!project) {
      return Response.json(
        { message: "Progetto non trovato." },
        { status: 404 }
      );
    }

    const emailExists = await ContactModel.exists({
      _id: { $in: project.contacts },
      email,
    });

    if (emailExists) {
      return Response.json(
        { message: "Email già associata a questo progetto." },
        { status: 400 }
      );
    }

    const newContact = new ContactModel({
      name,
      email,
    });

    await newContact.save();

    project.contacts.push(newContact._id);
    await project.save(); */

    await sendEmail(email);

    return Response.json(
      {
        message: "Contatto creato e email di conferma inviata con successo!",
        /* contact: newContact, */
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Errore durante la creazione del contatto o l'invio della mail:",
      error
    );
    return Response.json(
      { message: "Errore interno al server" },
      { status: 500 }
    );
  }
}
