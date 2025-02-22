"use server";
import connectDB from "@/lib/db";
import ContactModel from "@/models/Contact";
import ProfileModel from "@/models/Profiles";
import ProjectModel from "@/models/Project";
import nodemailer from "nodemailer";

type SendEmailProps = {
  projectId: string;
  email: string;
  receivers: {
    emails: string[];
    tags: string[];
  };
  data: {
    title: string;
    text: string;
    html: string;
  };
};

export const sendEmail = async ({
  projectId,
  email,
  receivers,
  data,
}: SendEmailProps) => {
  await connectDB();

  try {
    const project = await ProjectModel.findById(projectId)
      .populate("contacts", null, ContactModel)
      .populate("profiles", null, ProfileModel);
    if (!project) {
      throw new Error("Progetto non trovato.");
    }

    const foundProfile = await ProfileModel.findOne({
      email: project.profiles?.[0].email,
    });
    if (!foundProfile) {
      throw new Error("Profilo non trovato.");
    }

    const transporter = nodemailer.createTransport({
      host: foundProfile.host,
      port: foundProfile.port,
      secure: foundProfile.secure,
      auth: {
        user: foundProfile.email,
        pass: foundProfile.password,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });

    // Collect all emails to send
    let emailsToSend: string[] = [...receivers.emails];

    // Handle "Everyone" tag
    if (receivers.tags.includes("Everyone")) {
      const allEmails = project.contacts.map((contact: any) => contact.email);
      emailsToSend = [...emailsToSend, ...allEmails];
    } else {
      // Filter by specific tags
      for (const tag of receivers.tags) {
        const taggedContacts = await ContactModel.find({
          _id: { $in: project.contacts },
          tags: tag,
        });
        const taggedEmails = taggedContacts.map(
          (contact: any) => contact.email
        );
        emailsToSend = [...emailsToSend, ...taggedEmails];
      }
    }

    // Remove duplicates
    emailsToSend = [...new Set(emailsToSend)];

    for (const recipientEmail of emailsToSend) {
      try {
        const mailOptions = {
          from: `"NOXIS" <${foundProfile.email}>`,
          to: recipientEmail,
          subject: data.title,
          text: data.text,
          html: data.html,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email inviata a: ${recipientEmail}`);
      } catch (err) {
        console.error(`Errore durante l'invio a ${recipientEmail}:`, err);
      }
    }

    console.log("done");

    return {
      message: "Email inviate con successo a tutti i destinatari!",
    };
  } catch (error) {
    console.error("Errore durante l'invio della mail:", error);
    throw new Error("Errore interno al server");
  }
};
