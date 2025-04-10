import { z } from "zod";
import { NotificationReminderSchema } from "../utils/validation";
import { RouteStage, Trip } from "@/features/admin/types";

export interface NotificationReminder {
  id: string;
  userId?: string;
  expoPushToken: string;
  routeStageId: string;
  tripId: string;
  message: string;
  isSent: boolean;
  createdAt: string;
  updatedAt: string;
  routeStage?: RouteStage;
  trip?: Trip;
}

export type NotificationReminderFormData = z.infer<
  typeof NotificationReminderSchema
>;
