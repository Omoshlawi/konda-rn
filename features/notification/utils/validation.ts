import { z } from "zod";

export const FleetRouteInterStageMovementSchema = z.object({
  fleetId: z.string().uuid(),
  fleetNo: z.string().nonempty(),
  routeId: z.string().uuid(),
  routeName: z.string().nonempty(),
  currentStageId: z.string().uuid(),
  currentStage: z.string().nonempty(),
  nextStageId: z.string().uuid().optional(),
  nextStage: z.string().nonempty().optional(),
  tripId: z.string().uuid(),
  traversalDirection: z.enum(["Forward", "Reverse"]),
});

export const GPSSensorDataSchema = z.object({
  fleetNo: z.string().nonempty(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const NotificationReminderSchema = z.object({
  routeStageId: z.string().uuid("Invalid routes stage or not provided"),
  expoPushToken: z.string().optional(),
  fleetNo: z.string().nonempty("Required"),
});
