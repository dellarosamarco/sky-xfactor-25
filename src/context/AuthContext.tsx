import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthUser,
  getAuthenticatedUser,
  subscribeToAuthChanges,
} from "../services/authService";

type AuthContextType = {
  user: AuthUser | null;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshUser: async () => {
    /* no-op default */
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const refreshUser = async () => {
    const currentUser = await getAuthenticatedUser();
    setUser(currentUser);
  };

  useEffect(() => {
    let isMounted = true;

    refreshUser();

    const unsubscribe = subscribeToAuthChanges(async (capsule) => {
      const { payload } = capsule;

      if (!isMounted) {
        return;
      }

      const event = payload.event;

      if (event === "signedIn" || event === "tokenRefresh" || event === "autoSignIn") {
        await refreshUser();
      }

      if (event === "signedOut" || event === "oAuthSignOut") {
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
