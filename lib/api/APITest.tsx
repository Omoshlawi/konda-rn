import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "@/components";

const APITest = () => {
  const { data, error, isLoading } = useTodos();
  if (isLoading) return <Text>Loading</Text>;
  if (error)
    return <Text color={"text"}>{JSON.stringify(error, null, 2)}</Text>;
  return (
    <View>
      <Text color={"text"}>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default APITest;

const styles = StyleSheet.create({});

import { useApi } from "@/lib/api";
import { APIFetchResponse } from "@/lib/api/types";

const useTodos = () => {
  const { data, isLoading, error } = useApi<
    APIFetchResponse<{
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }>
  >("https://jsonplaceholder.typicode.com/todos/1");
  return { data: data?.data, isLoading, error };
};
