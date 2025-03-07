import { jwtDecode } from "jwt-decode";

export const decodeJWTtoken = (token: string) => {
  return jwtDecode<{
    organizationId?: string;
    userId: string;
    roles: Array<string>;
  }>(token);
};
