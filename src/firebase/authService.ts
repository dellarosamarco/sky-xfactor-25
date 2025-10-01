import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date()
    });

    return { user, error: null };
  } 
  catch (error: any) {
    let errorMessage = "Errore sconosciuto";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Questa email è già registrata.";
        break;
      case "auth/invalid-email":
        errorMessage = "Formato email non valido.";
        break;
      case "auth/weak-password":
        errorMessage = "La password è troppo debole (min. 6 caratteri).";
        break;
      default:
        errorMessage = error.message;
    }

    return { user: null, error: errorMessage };
  }
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
