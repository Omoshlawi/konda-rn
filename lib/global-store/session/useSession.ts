import { useSessionStore } from "./useSessionStore";

export const useSession = () => {
  const session = useSessionStore((state) => state.session);
  return session;
};
