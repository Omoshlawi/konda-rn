import { z } from "zod";
import {
  FleetRouteInterStageMovementSchema,
  GPSSensorDataSchema,
} from "../utils/validation";
import { Fleet } from "@/features/admin/types";

export type GPSSesorData = z.infer<typeof GPSSensorDataSchema>;

export type FleetRouteInterStageMovement = z.infer<
  typeof FleetRouteInterStageMovementSchema
>;

