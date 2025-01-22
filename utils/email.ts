import nodemailer from "nodemailer";

export async function sendEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email inviata: ${info.messageId}`);
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    throw new Error("Impossibile inviare l'email. Riprova più tardi.");
  }
}
