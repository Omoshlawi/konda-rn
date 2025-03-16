import { APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { County } from "../types";

export const useAddresses = () => {
  const url = constructUrl("/places/counties", {
    v: "custom:include(subCounties)",
  });
  const { data, error, isLoading, mutate } =
    useApi<APIFetchResponse<{ results: Array<County> }>>(url);

  return {
    address: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
