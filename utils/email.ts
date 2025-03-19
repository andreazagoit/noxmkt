"use server";
import connectDB from "@/lib/db";
import ContactModel from "@/models/Contact";
import ProfileModel from "@/models/Profiles";
import ProjectModel from "@/models/Project";
import nodemailer from "nodemailer";
import { hashEmail } from "./crypto";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { auth } from "@/auth";

type SendSingleEmailProps = {
  profile: any;
  list: string[];
  data: {
    title: string;
    text: string;
    html: string;
  };
};

export const sendEmail = async (
  profile: any,
  recipient: string,
  data: { title: string; text: string; html: string; actionId: string }
) => {
  const { title, text, html, actionId } = data;

  const transporter = nodemailer.createTransport({
    host: profile.host,
    port: profile.port,
    secure: profile.secure,
    auth: {
      user: profile.email,
      pass: profile.password,
    },
  });

  const trackingPixel = `<img src="${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/v1/members/${hashEmail(
    recipient
  )}/events?action=${actionId}&event=OPENED" width="1" height="1" style="display:none;">`;

  const mailOptions: SMTPTransport.Options = {
    from: `"${profile.name}" <${profile.email}>`,
    to: recipient,
    subject: title,
    text,
    html: `${html} ${trackingPixel}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email inviata a", recipient);
    return { success: true };
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    return { success: false, error: "Invio dell'email fallito" };
  }
};

export const sendEmailGmail = async () => {
  // Recupera la sessione e l'accessToken di NextAuth
  const { accessToken, user } = await auth();

  if (!accessToken || !user?.email) {
    throw new Error("AccessToken o email utente non trovati");
  }

  // Configura il trasportatore con le credenziali di Google
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: user.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessToken,
    },
  });

  // Dati dell'email
  const recipient = "andreabnk1@gmail.com"; // Inserisci il destinatario
  const title = "Test Email"; // Titolo dell'email
  const text = "This is a test email sent using Gmail via OAuth2."; // Corpo del testo
  const html = "<p>This is a test email sent using Gmail via OAuth2.</p>"; // Corpo HTML
  const actionId = "12345"; // Usa un ID appropriato per il tracciamento

  // Aggiungi un pixel di tracciamento
  const trackingPixel = `<img src="${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/members/${actionId}/events?action=OPENED" width="1" height="1" style="display:none;">`;

  // Definisci le opzioni dell'email
  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${user.name || "Test User"}" <${user.email}>`, // Usa il nome dell'utente dalla sessione
    to: recipient,
    subject: title,
    text,
    html: `${html} ${trackingPixel}`,
  };

  try {
    // Invia l'email
    await transporter.sendMail(mailOptions);
    console.log("Email inviata a", recipient);
    return { success: true };
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    return { success: false, error: "Invio dell'email fallito" };
  }
};

export const sendSingleEmail = async (
  profile: any,
  recipient: string,
  data: { title: string; text: string; html: string; actionId: string }
) => {
  const { title, text, html, actionId } = data;

  const transporter = nodemailer.createTransport({
    host: profile.host,
    port: profile.port,
    secure: profile.secure,
    auth: {
      user: profile.email,
      pass: profile.password,
    },
  });

  const trackingPixel = `<img src="${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/v1/members/${hashEmail(
    recipient
  )}/events?action=${actionId}&event=OPENED" width="1" height="1" style="display:none;">`;

  const mailOptions: SMTPTransport.Options = {
    from: `"${profile.name}" <${profile.email}>`,
    to: recipient,
    subject: title,
    text,
    html: `${html} ${trackingPixel}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email inviata a", recipient);
    return { success: true };
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    return { success: false, error: "Invio dell'email fallito" };
  }
};

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

export const sendEmail2 = async ({
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

    let emailsToSend: string[] = [...receivers.emails];

    if (receivers.tags.includes("Everyone")) {
      const allEmails = project.contacts.map((contact: any) => contact.email);
      emailsToSend = [...emailsToSend, ...allEmails];
    } else {
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
