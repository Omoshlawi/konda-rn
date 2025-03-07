import { z } from "zod";
import { LoginShema, RegisterSchema } from "../utils";
import { User as SessionUser } from "@/lib/global-store";

export type LoginFormData = z.infer<typeof LoginShema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export interface User extends SessionUser {
  accounts?: Account[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  refresh_expire_at?: string;
  access_token?: string;
  expires_at?: string;
  token_type?: string;
  scope?: string;
  voided: boolean;
  id_token?: string;
  createdAt: string;
  updatedAt: string;
}
