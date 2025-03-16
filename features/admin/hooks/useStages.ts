import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Stage, StageFormData } from "../types";

export const useStages = () => {
  const url = constructUrl(`/stage`, { v: "custom:include(county,subCounty)" });
  const { data, error, mutate, isLoading } =
    useApi<APIFetchResponse<{ results: Array<Stage> }>>(url);
  return {
    stages: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

const createStage = async (data: StageFormData) => {
  const response = await apiFetch<Stage>(`/stage`, { method: "POST", data });
  return response.data;
};
const updateStage = async (
  stageId: string,
  data: StageFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<Stage>(`/stage/${stageId}`, {
    method: method,
    data,
  });
  return response.data;
};
const deleteStage = async (
  stageId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<Stage>(`/stage/${stageId}`, {
    method: method,
  });
  return response.data;
};
export const useStagesApi = () => {
  return {
    createStage,
    updateStage,
    deleteStage,
  };
};
