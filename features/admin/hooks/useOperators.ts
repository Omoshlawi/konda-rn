import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { Operator, OperatorFormData } from "../types";

export const useOperators = () => {
  const url = constructUrl(`/operators`);
  const { data, error, mutate, isLoading } =
    useApi<APIFetchResponse<{ results: Array<Operator> }>>(url);
  return {
    operators: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

const createOperator = async (data: OperatorFormData) => {
  const response = await apiFetch<Operator>(`/operators`, {
    method: "POST",
    data,
  });
  return response.data;
};
const updateOperator = async (
  operatorId: string,
  data: OperatorFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<Operator>(`/operators/${operatorId}`, {
    method: method,
    data,
  });
  return response.data;
};
const deleteOperator = async (
  operatorId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<Operator>(`/operators/${operatorId}`, {
    method: method,
  });
  return response.data;
};
export const useOperatorsApi = () => {
  return {
    createOperator,
    updateOperator,
    deleteOperator,
  };
};
