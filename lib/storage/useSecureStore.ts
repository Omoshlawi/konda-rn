import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UseStorageHook<T> = [T | null, (value: T | null) => void];

function useAsyncState<T>(initialValue: T | null = null): UseStorageHook<T> {
  return useReducer(
    (_: T | null, action: T | null = null): T | null => action,
    initialValue
  ) as UseStorageHook<T>;
}

async function setStorageItemAsync(key: string, value: any) {
  const serializedValue = value !== null ? JSON.stringify(value) : null;

  if (Platform.OS === "web") {
    try {
      if (serializedValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializedValue);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (serializedValue === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, serializedValue);
    }
  }
}

export function useSecureStorage<T>(key: string): UseStorageHook<T> {
  const [state, setState] = useAsyncState<T>();

  useEffect(() => {
    const getItem = async () => {
      let value: string | null = null;

      if (Platform.OS === "web") {
        try {
          if (typeof localStorage !== "undefined") {
            value = localStorage.getItem(key);
          }
        } catch (e) {
          console.error("Local storage is unavailable:", e);
        }
      } else {
        value = await SecureStore.getItemAsync(key);
      }

      if (value) {
        try {
          const parsedValue = JSON.parse(value);
          setState(parsedValue);
        } catch (e) {
          console.error("Error parsing stored value:", e);
          setState(null);
        }
      } else {
        setState(null);
      }
    };

    getItem();
  }, [key]);

  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
