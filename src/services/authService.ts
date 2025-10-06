import '../lib/amplify';
import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { Hub, HubCapsule } from '@aws-amplify/core';

type SignInOptions = {
  email: string;
  password: string;
};

type RegisterResult = {
  user: AuthUser | null;
  error: string | null;
};

type AuthResult = {
  user: AuthUser | null;
  error: string | null;
};

export type AuthUser = {
  userId: string;
  username: string;
  email?: string;
};

type AuthEventPayload = {
  event: string;
  data?: unknown;
  message?: string;
};

export type AuthSubscriptionCallback = (
  capsule: HubCapsule<'auth', AuthEventPayload>,
) => void | Promise<void>;

const amplifyErrorMessages: Record<string, string> = {
  UsernameExistsException: 'Esiste già un account con questa e-mail.',
  NotAuthorizedException: 'Credenziali non valide. Riprova.',
  PasswordResetRequiredException: 'La password deve essere reimpostata prima di accedere.',
  TooManyFailedAttemptsException: 'Troppi tentativi falliti. Riprova tra qualche minuto.',
  TooManyRequestsException: 'Troppo traffico sul servizio di login. Riprova più tardi.',
  InvalidPasswordException: 'La password non rispetta i requisiti di sicurezza.',
};

const mapAuthError = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const err = error as { name?: string; message?: string };
    if (err.name && amplifyErrorMessages[err.name]) {
      return amplifyErrorMessages[err.name];
    }

    if (err.message) {
      return err.message;
    }
  }

  return 'Si è verificato un errore imprevisto.';
};

const buildAuthUser = async (): Promise<AuthUser> => {
  const current = await getCurrentUser();
  let email: string | undefined;

  try {
    const session = await fetchAuthSession();
    email = session.tokens?.idToken?.payload?.email as string | undefined;
  } catch {
    // Ignore if there is no active session (should not happen after getCurrentUser).
  }

  return {
    userId: current.userId,
    username: current.username,
    email: email || current.signInDetails?.loginId,
  };
};

export const register = async (email: string, password: string): Promise<RegisterResult> => {
  try {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });

    return await login({ email, password });
  } catch (error) {
    if (error && typeof error === 'object') {
      const { name } = error as { name?: string };

      if (name === 'UsernameExistsException' || name === 'UserNotConfirmedException') {
        return await login({ email, password });
      }
    }

    return {
      user: null,
      error: mapAuthError(error),
    };
  }
};

export const login = async ({ email, password }: SignInOptions): Promise<AuthResult> => {
  try {
    const result = await signIn({ username: email, password });

    if (!result.isSignedIn) {
      return {
        user: null,
        error: `Completa il flusso di autenticazione richiesto (${result.nextStep.signInStep}).`,
      };
    }

    const user = await buildAuthUser();

    return {
      user,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: mapAuthError(error),
    };
  }
};

export const logout = async () => {
  await signOut();
};

export const confirmRegistration = async (email: string, confirmationCode: string) => {
  await confirmSignUp({ username: email, confirmationCode });
};

export const resendConfirmationCode = async (email: string) => {
  await resendSignUpCode({ username: email });
};

export const getAuthenticatedUser = async (): Promise<AuthUser | null> => {
  try {
    return await buildAuthUser();
  } catch {
    return null;
  }
};

export const subscribeToAuthChanges = (callback: AuthSubscriptionCallback) => {
  const unsubscribe = Hub.listen('auth', (capsule) => {
    void callback(capsule);
  });
  return () => {
    unsubscribe();
  };
};
