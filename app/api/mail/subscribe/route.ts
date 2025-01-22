import ContactModel from "@/models/Contact";
import ProjectModel from "@/models/Project";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { projectId, name, email } = await req.json();

  if (!projectId || !name || !email) {
    return Response.json(
      { message: "Dati non validi. projectId, name ed email sono richiesti." },
      { status: 400 }
    );
  }

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return Response.json(
        { message: "Progetto non trovato." },
        { status: 404 }
      );
    }

    const emailExists = await ContactModel.exists({
      _id: { $in: project.contacts }, // Check only within the project's contacts
      email,
    });

    if (emailExists) {
      return Response.json(
        { message: "Email già associata a questo progetto." },
        { status: 400 }
      );
    }

    // Create a new contact
    const newContact = new ContactModel({
      name,
      email,
    });

    await newContact.save();

    // Add the contact to the project's contacts
    project.contacts.push(newContact._id);
    await project.save();

    // Configure Nodemailer with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Newsletter 👻" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Conferma iscrizione alla newsletter",
      text: `Ciao, grazie per esserti iscritto alla nostra newsletter!`,
      html: `
        <p>Ciao,</p>
        <p>Grazie per esserti iscritto alla nostra newsletter! <a href="https://noxis.agency">Vai!</a></p>
        <img src="https://noxis.agency/api/mail/tracking?email=${encodeURIComponent(
          email
        )}" width="1" height="1" style="display:none;" />
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return Response.json(
      {
        message: "Contatto creato e email di conferma inviata con successo!",
        contact: newContact,
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
