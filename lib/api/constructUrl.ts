import httpClient from "./httpClient";

/**
 * Constructs a URL with query parameters from a path and params object.
 *
 * @param path - The base path of the URL (e.g., "/api/resource" or "/api/resource?existing=1").
 * @param params - An object representing additional query parameters (e.g., { id: 123, name: "test" }).
 * @returns The constructed URL as a string.
 */
export function constructUrl(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): string {
  const [basePath, existingQuery] = path.split("?"); // Split the path into base path and existing query
  const existingParams = new URLSearchParams(existingQuery || ""); // Parse existing query parameters
  const newParams = new URLSearchParams();

  // Add new params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      newParams.set(key, String(value)); // Add the new parameters
    }
  });

  // Merge existing and new parameters
  const mergedParams = new URLSearchParams(existingParams);
  newParams.forEach((value, key) => {
    mergedParams.set(key, value); // Overwrite or add new params
  });

  const queryString = mergedParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath; // Combine base path and merged query string
}

