import { decodeJWTtoken, SESSION_TOKEN_KEY } from "../utils";
import { useEffect, useState } from "react";
import { useAuthAPi } from "./useAuthApi";
import { useSecureStorage } from "@/lib/storage";
import { TokenPair, useSessionStore } from "@/lib/global-store";
import { showSnackbar } from "@/lib/overlays";

const useLoadInitialAuthState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useSecureStorage<TokenPair>(SESSION_TOKEN_KEY);
  const updateSessionStore = useSessionStore((state) => state.update);
  const updateSessionToken = useSessionStore((state) => state.setSessionToken);
  const { getSessionUserByToken } = useAuthAPi();

  const initializeSessionHelpers = () => {
    updateSessionStore({
      cacheSession: (session) => {
        setToken(session.token ?? null);
      },
      decodeSesionToken: (token) => {
        return decodeJWTtoken(token.accessToken);
      },
      clearCache: () => {
        setToken(null);
      },
    });
  };
  useEffect(() => {
    initializeSessionHelpers();
    if (token) {
      setIsLoading(true);
      updateSessionToken(token);
      getSessionUserByToken(token.accessToken)
        .then((user) => {
          updateSessionStore({
            session: {
              isAuthenticated: true,
              user,
              token: token,
              isGuestUser: false,
            },
          });
        })
        .catch((e) => {
          showSnackbar({
            kind: "error",
            title: "error authenticating",
            subtitle: e?.response?.data?.detail ?? e?.message,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);
  return { isLoading };
};

export default useLoadInitialAuthState;
