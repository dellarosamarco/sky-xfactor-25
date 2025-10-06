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

type BaseAuthResult = {
  user: AuthUser | null;
  error: string | null;
  code?: string | null;
};

type RegisterResult = BaseAuthResult;

type AuthResult = BaseAuthResult;

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
  UsernameExistsException: 'Esiste gia un account con questa email.',
  AliasExistsException: 'Esiste gia un account con questa email.',
  NotAuthorizedException: 'Credenziali non valide. Riprova.',
  PasswordResetRequiredException: 'La password deve essere reimpostata prima di accedere.',
  TooManyFailedAttemptsException: 'Troppi tentativi falliti. Riprova tra qualche minuto.',
  TooManyRequestsException: 'Troppo traffico sul servizio di login. Riprova piu tardi.',
  InvalidPasswordException: 'La password non rispetta i requisiti di sicurezza.',
  UserNotFoundException: 'Nessun account associato a questa email.',
  UserNotConfirmedException: 'Completa la conferma dell account prima di accedere.',
};

const extractAuthErrorCode = (error: unknown): string | null => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const err = error as { name?: string; __type?: string; code?: string };

  return err.name || err.__type || err.code || null;
};

const mapAuthError = (error: unknown) => {
  if (typeof error === 'string') {
    return error;
  }

  const code = extractAuthErrorCode(error);
  if (code && amplifyErrorMessages[code]) {
    return amplifyErrorMessages[code];
  }

  if (error && typeof error === 'object') {
    const err = error as { message?: string };
    if (err.message) {
      return err.message;
    }
  }

  return 'Si e verificato un errore imprevisto.';
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
  const trimmedEmail = email.trim();

  const nickName = trimmedEmail.split('@')[0];
  const userAttributes: Record<string, string> = {
    email: trimmedEmail,
  };

  if (nickName) {
    userAttributes.nickname = nickName;
  }

  try {
    await signUp({
      username: trimmedEmail,
      password,
      options: {
        userAttributes,
      },
    });
  } catch (error) {
    const errorCode = extractAuthErrorCode(error);

    if (
      errorCode === 'UsernameExistsException'
      || errorCode === 'AliasExistsException'
      || errorCode === 'UserNotConfirmedException'
    ) {
      const loginResult = await login({ email: trimmedEmail, password });

      if (loginResult.user) {
        return loginResult;
      }

      return {
        user: null,
        error: loginResult.error || mapAuthError(error),
        code: loginResult.code ?? errorCode ?? null,
      };
    }

    return {
      user: null,
      error: mapAuthError(error),
      code: errorCode,
    };
  }

  return await login({ email: trimmedEmail, password });
};

export const login = async ({ email, password }: SignInOptions): Promise<AuthResult> => {
  try {
    const result = await signIn({ username: email, password });

    if (!result.isSignedIn) {
      const signInStep = result.nextStep?.signInStep ?? null;
      return {
        user: null,
        error: signInStep
          ? `Completa il flusso di autenticazione richiesto (${signInStep}).`
          : 'Completa il flusso di autenticazione richiesto.',
        code: signInStep,
      };
    }

    const user = await buildAuthUser();

    return {
      user,
      error: null,
      code: null,
    };
  } catch (error) {
    const errorCode = extractAuthErrorCode(error);

    return {
      user: null,
      error: mapAuthError(error),
      code: errorCode,
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
