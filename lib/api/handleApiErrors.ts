import { isAxiosError } from "axios";

const handleAPIErrors = <T extends Record<string, unknown>>(
  error: any
): { [field in keyof T]?: string } & { detail?: string } => {
  if (isAxiosError(error)) {
    if (error.response?.status === 400) {
      return Object.entries(error.response?.data ?? {}).reduce(
        (prev, [key, value]) => {
          if (key === "_errors")
            return { ...prev, detail: (value as string[]).join(", ") };
          return {
            ...prev,
            [key]: (value as { _errors: string[] })._errors.join(", "),
          };
        },
        {}
      );
    }
    return {
      detail:
        error?.response?.data?.detail ??
        error.message ??
        "Unknown error occured",
    };
  }
  return {
    detail: error?.message ?? "Unknown error occured",
  };
};
export default handleAPIErrors;
