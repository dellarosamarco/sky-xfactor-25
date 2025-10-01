import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'test@test.com',
    pass: '123456',
  },
});

export const sendVideoEmail = functions.https.onCall(async (data, context) => {
  const { to, videoUrl } = data.data;

  if (!to || !videoUrl) {
    throw new functions.https.HttpsError("invalid-argument", "Email o videoUrl mancanti");
  }

  const mailOptions = {
    from: `"Video Service" <test@test.com>`,
    to,
    subject: "Il tuo video è pronto 🎥",
    text: `Ciao! Il tuo video è stato caricato con successo. Ecco il link: ${videoUrl}`,
    html: `
      <p>Ciao 👋</p>
      <p>Il tuo video è stato caricato con successo.</p>
      <p><a href="${videoUrl}">📺 Guarda il video</a></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    throw new functions.https.HttpsError("internal", error.message, error);
  }
});
