import { z } from "zod";
import {
  FleetRouteInterStageMovementSchema,
  GPSSensorDataSchema,
} from "../utils/validation";

export type GPSSesorData = z.infer<typeof GPSSensorDataSchema>;

export type FleetRouteInterStageMovement = z.infer<
  typeof FleetRouteInterStageMovementSchema
>;
