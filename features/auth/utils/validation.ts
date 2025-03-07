import { z } from "zod";
export const RegisterSchema = z
  .object({
    username: z.string().min(4),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(4),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must much",
    path: ["confirmPassword"],
  });

export const LoginShema = z.object({
  identifier: z.string().min(1, { message: "Identifier required" }),
  password: z.string().min(4, { message: "Password required" }),
});

export const OauthAuthSchemaSchema = z.object({
  providerAccountId: z.string(),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  type: z.enum(["google", "apple"]),
  provider: z.string(),
});
