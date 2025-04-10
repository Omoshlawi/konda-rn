import { z } from "zod";
import { NotificationReminderSchema } from "../utils/validation";

export interface NotificationReminder {
    id:string
}

export type NotificationReminderFormData = z.infer<
  typeof NotificationReminderSchema
>;
