import { TokenPair, useSessionStore } from "@/lib/global-store";
import { LoginFormData, RegisterFormData, User } from "../types";
import { decodeJWTtoken, SESSION_TOKEN_KEY } from "../utils";
import { apiFetch } from "@/lib/api";
import { useSecureStorage } from "@/lib/storage";
const loginUser = async (data: LoginFormData) => {
  const resp = await apiFetch<{ user: User; token: TokenPair }>(
    "/auth/signin/credentials",
    {
      data: data,
      method: "POST",
    }
  );
  const responseData = resp.data;

  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
      user: responseData.user,
    },
  }));

  return responseData;
};
const registerUser = async (data: RegisterFormData) => {
  const resp = await apiFetch<{ user: User; token: TokenPair }>(
    "/auth/signup",
    { data: data, method: "POST" }
  );
  const responseData = resp.data;
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      isAuthenticated: true,
      token: responseData.token,
      user: responseData.user,
      
    },
  }));
  return responseData;
};

const getSessionUserByToken = async (token: string) => {
  const v = "custom:include(person,accounts)";
  const resp = await apiFetch<User>("/users/profile", {
    params: { v },
    headers: { "x-access-token": token },
  });
  const responseData = resp.data;
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      ...state.session,
      user: responseData,
    },
  }));
  return responseData;
};

const logoutUser = () => {
  useSessionStore.setState((state) => ({
    ...state,
    session: {
      isAuthenticated: false,
      token: undefined,
      user: undefined,
      currentOrganization: undefined,
    },
  }));
};

export const useAuthAPi = () => {
  const [, setToken] = useSecureStorage<TokenPair>(SESSION_TOKEN_KEY);

  return {
    loginUser: async (data: LoginFormData) => {
      const response = await loginUser(data);
      setToken(response.token);
      return response;
    },
    registerUser: async (data: RegisterFormData) => {
      const response = await registerUser(data);
      setToken(response.token);
      return response;
    },
    getSessionUserByToken,
    logoutUser: () => {
      logoutUser();
      setToken(null);
    },
  };
};
