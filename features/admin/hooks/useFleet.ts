import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Fleet, FleetFormData } from "../types";

export const useFleet = () => {
  const url = constructUrl(`/fleet`);
  const { data, error, mutate, isLoading } =
    useApi<APIFetchResponse<{ results: Array<Fleet> }>>(url);
  return {
    fleet: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
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
export const useFleetApi = () => {
  return {
    createFleet,
    updateFleet,
    deleteFleet,
  };
};
