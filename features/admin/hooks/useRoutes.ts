import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Route, RouteFormData, RouteStage, RouteStageFormData } from "../types";

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

export const useRoute = (routeId: string, params: Record<string, any> = {}) => {
  const url = constructUrl(`/route/${routeId}`, params);
  const { data, isLoading, mutate, error } =
    useApi<APIFetchResponse<{ results: Array<Route> }>>(url);
  return {
    routes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useRouteStages = (routeId: string) => {
  const url = constructUrl(`/route/${routeId}/stages`, {
    v: "custom:include(stage:include(county,subCounty))",
  });
  const { data, isLoading, mutate, error } =
    useApi<APIFetchResponse<{ results: Array<RouteStage> }>>(url);
  return {
    routeStages: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

const createRoute = async (data: RouteFormData) => {
  const response = await apiFetch<Route>(`/route`, { method: "POST", data });
  return response.data;
};
const updateRoute = async (
  routeId: string,
  data: RouteFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<Route>(`/route/${routeId}`, {
    method: method,
    data,
  });
  return response.data;
};
const deleteRoute = async (
  routeId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<Route>(`/route/${routeId}`, {
    method: method,
  });
  return response.data;
};
const createRouteStage = async (routeId: string, data: RouteStageFormData) => {
  const response = await apiFetch<RouteStage>(`/route/${routeId}/stages`, {
    method: "POST",
    data,
  });
  return response.data;
};
const updateRouteStage = async (
  routeId: string,
  routeStageId: string,
  data: RouteStageFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<RouteStage>(
    `/route/${routeId}/stages/${routeStageId}`,
    {
      method: method,
      data,
    }
  );
  return response.data;
};
const shiftRouteStage = async (
  routeId: string,
  routeStageId: string,
  direction: "up" | "down"
) => {
  const response = await apiFetch<RouteStage>(
    `/route/${routeId}/stages/${routeStageId}/shift/${direction}`,
    {
      method: "PUT",
    }
  );
  return response.data;
};
const deleteRouteStage = async (
  routeId: string,
  routeStageId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<RouteStage>(
    `/route/${routeId}/stages/${routeStageId}`,
    {
      method: method,
    }
  );
  return response.data;
};

export const useRoutesApi = () => {
  return {
    createRoute,
    updateRoute,
    deleteRoute,
    createRouteStage,
    updateRouteStage,
    deleteRouteStage,
    shiftRouteStage,
  };
};
