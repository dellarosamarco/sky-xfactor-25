import '../lib/amplify';
import { getAuthenticatedUser } from './authService';
import { apiPost } from './apiService';

export const sendVideoEmail = async (videoUrl: string) => {
  const user = await getAuthenticatedUser();

  if (!user || !user.email) {
    throw new Error('Utente non autenticato o senza e-mail.');
  }

  await apiPost('/emails/video-feedback', {
    to: user.email,
    videoUrl,
  });
};
