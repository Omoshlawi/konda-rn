import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Route, RouteFormData } from "../types";

export const useRoutes = () => {
  const url = constructUrl("/route");
  const { data, isLoading, mutate, error } =
    useApi<APIFetchResponse<{ results: Array<Route> }>>(url);
  return {
    routes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

const createRoute = async (data: RouteFormData) => {
  const response = await apiFetch(`/route`, { method: "POST", data });
  return response.data;
};
const updateRoute = async (
  routeId: string,
  data: RouteFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch(`/route/${routeId}`, {
    method: method,
    data,
  });
  return response.data;
};
const deleteRoute = async (
  routeId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch(`/stage/${routeId}`, { method: method });
  return response.data;
};

export const useRoutesApi = () => {
  return {
    createRoute,
    updateRoute,
    deleteRoute,
  };
};
