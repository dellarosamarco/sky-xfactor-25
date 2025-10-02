import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

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
    if (error.code === "auth/email-already-in-use") {
      return await login(email, password);
    }

    let errorMessage = "Errore sconosciuto";
    switch (error.code) {
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

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateDoc(doc(db, "users", user.uid), {
      lastLoginAt: new Date()
    });

    return { user, error: null };
  } 
  catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logout = () => {
  return signOut(auth);
};
