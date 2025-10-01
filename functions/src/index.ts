import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: "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",
  },
});

export const sendVideoEmail = functions.https.onCall(async (data, context) => {
  const { to, videoUrl } = data.data;

  if (!to || !videoUrl) {
    throw new functions.https.HttpsError("invalid-argument", "Email o videoUrl mancanti");
  }

  const mailOptions = {
    from: `"Video Service" <skyxfactorcontest@gmail.com>`,
    to,
    subject: "Il tuo video è pronto 🎥",
    text: `Ciao! Il tuo video è stato caricato con successo. Ecco il link: ${videoUrl}`,
    html: `
      <p>Ciao 👋</p>
      <p>Il tuo video è stato caricato con successo.</p>
      <p><a href="${videoUrl}">📺 Guarda il video</a></p>
    `,
    headers: {
      "X-SMTPAPI": JSON.stringify({ filters: { clicktrack: { settings: { enable: 0 } } } })
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    throw new functions.https.HttpsError("internal", error.message, error);
  }
});
