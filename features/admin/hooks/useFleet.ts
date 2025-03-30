import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Fleet, FleetFormData, FleetRoute, FleetRouteFormData } from "../types";

export const useFleets = (params: Record<string, any> = {}) => {
  const url = constructUrl(`/fleet`, params);
  const { data, error, mutate, isLoading } =
    useApi<APIFetchResponse<{ results: Array<Fleet> }>>(url);
  return {
    fleets: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useFleetRoutes = (
  fleetId?: string,
  params?: Record<string, any>
) => {
  const url = constructUrl(`/fleet/${fleetId}/routes`, {
    v: "custom:include(fleet,route)",
    ...params,
  });
  const { data, error, isLoading, mutate } = useApi<
    APIFetchResponse<{ results: Array<FleetRoute> }>
  >(fleetId ? url : null);
  return {
    isLoading,
    error,
    mutate,
    fleetRoutes: data?.data?.results ?? [],
  };
};

const createFleet = async (data: FleetFormData) => {
  const response = await apiFetch<Fleet>(`/fleet`, { method: "POST", data });
  return response.data;
};
const updateFleet = async (
  fleetId: string,
  data: FleetFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<Fleet>(`/fleet/${fleetId}`, {
    method: method,
    data,
  });
  return response.data;
};
const deleteFleet = async (
  fleetId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<Fleet>(`/fleet/${fleetId}`, {
    method: method,
  });
  return response.data;
};
const createFleetRoute = async (fleetId: string, data: FleetRouteFormData) => {
  const response = await apiFetch<FleetRoute>(`/fleet/${fleetId}/routes`, {
    method: "POST",
    data,
  });
  return response.data;
};
const updateFleetRoute = async (
  fleetId: string,
  fleetRouteId: string,
  data: FleetRouteFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<FleetRoute>(
    `/fleet/${fleetId}/routes/${fleetRouteId}`,
    {
      method: method,
      data,
    }
  );
  return response.data;
};
const activateFleetRoute = async (fleetId: string, fleetRouteId: string) => {
  const response = await apiFetch<FleetRoute>(
    `/fleet/${fleetId}/routes/${fleetRouteId}/activate`,
    {
      method: "PUT",
    }
  );
  return response.data;
};
const deleteFleetRoute = async (
  fleetId: string,
  fleetRouteId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<FleetRoute>(
    `/fleet/${fleetId}/routes/${fleetRouteId}`,
    {
      method: method,
    }
  );
  return response.data;
};
export const useFleetApi = () => {
  return {
    createFleet,
    updateFleet,
    deleteFleet,
    createFleetRoute,
    updateFleetRoute,
    deleteFleetRoute,
    activateFleetRoute,
  };
};
