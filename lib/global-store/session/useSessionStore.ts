import { create } from "zustand";
import { Session, TokenPair, User } from "../types";

export type SessionStore = {
  session: Session;
  setSession: (session: Session) => void;
  setSessionUser: (user: User) => void;
  setSessionOrganization: (organization: string) => void;
  setSessionToken: (token: TokenPair, cacheToken?: () => void) => void;
  clearSession: (clearCache?: () => void) => void;
  clearCache?: () => void;
  cacheSession?: (session: Partial<Session>) => void;
  decodeSesionToken?: (token: TokenPair) => any;
  update: (store: Partial<SessionStore>) => void;
  updateSession: (store: Partial<Session>) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  session: { isAuthenticated: false }, // Initial state
  /**
   * Updates the entire session object.
   */
  setSession: (session: Session) => set((state) => ({ ...state, session })),
  /**
   * Updates the user object within the session.
   */
  setSessionUser: (user: User) =>
    set((state) => ({ ...state, session: { ...state.session, user: user } })),
  /**
   * updates organization i session object
   * @param organization
   * @returns
   */
  setSessionOrganization: (organization: string) =>
    set((state) => ({
      ...state,
      session: { ...state.session, currentOrganization: organization },
    })),
  /**
   * Updates the token object within the session and optionally triggers caching logic.
   */
  setSessionToken: (token: TokenPair, cacheToken?: () => void) => {
    set((state) => ({ ...state, session: { ...state.session, token } }));
    cacheToken?.();
  },
  /**
   * Clears the session state and optionally clears cached data.
   */
  clearSession: (clearCash) => {
    set((state) => ({
      ...state,
      session: {
        isAuthenticated: false,
        user: undefined,
        token: undefined,
        refreshToken: undefined,
        currentOrganization: undefined,
      },
    }));
    clearCash?.();
  },
  /**
   * Updates specific keys in the session store.
   */
  update: (store: Partial<SessionStore>) =>
    set((state) => ({
      ...state,
      ...Object.entries(store)?.reduce((prev, [key, val]) => {
        if (val !== undefined && val !== null) {
          return { ...prev, [key]: val };
        }
        return prev;
      }, {}),
    })),
  updateSession: (session: Partial<Session>) =>
    set((state) => ({
      ...state,
      session: {
        ...state.session,
        ...Object.entries(session)?.reduce((prev, [key, val]) => {
          if (val !== undefined && val !== null) {
            return { ...prev, [key]: val };
          }
          return prev;
        }, {}),
      },
    })),
}));
