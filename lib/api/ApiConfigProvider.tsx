import React, { FC, PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { apiFetch } from "./apiFetch";

interface ApiConfigProviderProps extends PropsWithChildren {}

const ApiConfigProvider: FC<ApiConfigProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => await apiFetch(resource, init),
        // dedupingInterval: 2000, // Prevent duplicate requests within 2 seconds
        // revalidateOnFocus: true, // Refetch when the app regains focus
        // revalidateOnReconnect: true, // Refetch when network reconnects
        // shouldRetryOnError: true, // Retry failed requests
        // onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        //   // Limit retries to prevent infinite loops
        //   if (retryCount >= 3) return;

        //   // Retry only for network-related errors
        //   if (!error.response || error.response.status >= 500) {
        //     setTimeout(() => revalidate({ retryCount }), 2000); // Retry after 2 seconds
        //   }
        // },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default ApiConfigProvider;
