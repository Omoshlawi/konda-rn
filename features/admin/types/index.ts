import { ExpoIcon } from "@/components";
import { z } from "zod";
import {
  FleetSchema,
  OperatorSchema,
  RoutePricingSchema,
  RouteSchema,
  RouteStageschema,
  StagesShema,
} from "../utils/validation";

export type MenuItem = {
  name: string;
  icon: ExpoIcon;
  route: string;
  color?: string;
};

export interface Stage {
  id: string;
  name: string;
  countyCode: string;
  subCountyCode: string;
  latitude: string;
  longitude: string;
  radius: number;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  county?: County;
  subCounty?: SubCounty;
}

export interface County {
  code: string;
  name: string;
  capital: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  subCounties?: Array<SubCounty>;
}

export interface SubCounty {
  code: string;
  name: string;
  countyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distanceKm: number;
  estimatedTimeMin: number;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export interface Operator {
  id: string;
  name: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export interface Fleet {
  id: string;
  name: string;
  vehicleType: "Bus" | "Matatu" | "Shuttle";
  capacity: number;
  plateNumber: string;
  operatorId: string;
  status: "Active" | "Inactive" | "Maintenance";
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export type StageFormData = z.infer<typeof StagesShema>;
export type RouteFormData = z.infer<typeof RouteSchema>;
export type OperatorFormData = z.infer<typeof OperatorSchema>;
export type FleetFormData = z.infer<typeof FleetSchema>;
export type RouteStageFormData = z.infer<typeof RouteStageschema>;
export type RoutePricingFormData = z.infer<typeof RoutePricingSchema>;
