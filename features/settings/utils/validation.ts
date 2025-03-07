import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z.string().min(1, "required"),
  description: z.string().min(1, "required"),
});
