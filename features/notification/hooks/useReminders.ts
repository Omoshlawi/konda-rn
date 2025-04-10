import { apiFetch, APIFetchResponse, constructUrl, useApi } from "@/lib/api";
import { NotificationReminder, NotificationReminderFormData } from "../types";

export const useReminders = (params: Record<string, any>) => {
  const url = constructUrl(`/notification-reminders`, params);
  const { data, error, mutate, isLoading } =
    useApi<APIFetchResponse<{ results: Array<NotificationReminder> }>>(url);
  return {
    reminders: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};

const createReminder = async (data: NotificationReminderFormData) => {
  const response = await apiFetch<NotificationReminder>(
    `/notification-reminders`,
    {
      method: "POST",
      data,
    }
  );
  return response.data;
};
const updateReminder = async (
  reminderId: string,
  data: NotificationReminderFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const response = await apiFetch<NotificationReminder>(
    `/notification-reminders/${reminderId}`,
    {
      method: method,
      data,
    }
  );
  return response.data;
};
const deleteReminder = async (
  reminderId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const response = await apiFetch<NotificationReminder>(
    `/notification-reminders/${reminderId}`,
    {
      method: method,
    }
  );
  return response.data;
};

export const useRemindersApi = () => {
  return {
    createReminder,
    updateReminder,
    deleteReminder,
  };
};
