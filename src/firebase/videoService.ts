import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const storage = getStorage();
const db = getFirestore();

export const uploadVideo = async (videoBlob: Blob) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Utente non autenticato");
  }

  try {
    // Nome file univoco: uid/timestamp.webm
    const fileName = `${Date.now()}.webm`;
    const videoRef = ref(storage, `videos/${user.email?.replace(/@.*/, "")}_${user.uid}/${fileName}`);

    // Carica il Blob su Firebase Storage
    await uploadBytes(videoRef, videoBlob);

    // Ottieni l'URL pubblico
    const downloadURL = await getDownloadURL(videoRef);

    // Salva i metadati in Firestore
    await addDoc(collection(db, "videos"), {
      uid: user.uid,
      url: downloadURL,
      createdAt: serverTimestamp(),
    });

    return downloadURL;
  } 
  catch (error) {
    console.error("Errore durante l'upload del video:", error);
    throw error;
  }
};
