import { getAuth } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebaseConfig";

export const sendVideoEmail = async (videoUrl: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Utente non autenticato o senza email");
  }

  const sendEmailFn = httpsCallable(functions, "sendVideoEmail");
  await sendEmailFn({
    to: user.email,
    videoUrl,
  });
};
