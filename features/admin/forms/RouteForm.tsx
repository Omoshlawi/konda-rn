import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollView, StyleSheet, View } from "react-native";
import { Box, Button, TextInput, Text } from "@/components";
import { RouteSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { Route, RouteFormData } from "../types";
import { useRoutesApi } from "../hooks";

type Props = {
  route?: Route;
  onSuccess?: (route: Route) => void;
};

const RouteForm: FC<Props> = ({ onSuccess, route }) => {
  const { createRoute, updateRoute } = useRoutesApi();
  const form = useForm<RouteFormData>({
    defaultValues: {
      name: route?.name ?? "",
      distanceKm: route?.distanceKm ? Number(route.distanceKm) : undefined,
      estimatedTimeMin: route?.estimatedTimeMin
        ? Number(route.estimatedTimeMin)
        : undefined,
      startPoint: route?.startPoint ?? "",
      endPoint: route?.endPoint ?? "",
    },
    resolver: zodResolver(RouteSchema),
  });

  const onSubmit: SubmitHandler<RouteFormData> = async (data) => {
    try {
      // Assuming createRoute and updateRoute are defined in useRoutesApi
      const res = route
        ? await updateRoute(route?.id, data)
        : await createRoute(data);
      onSuccess?.(res);
      mutate("/route");
      showSnackbar({
        title: "success",
        subtitle: `Route ${route ? "updated" : "created"} successfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<RouteFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else {
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RouteFormData, { message: val })
        );
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box width={"100%"} gap={"m"} p={"m"}>
        <Controller
          control={form.control}
          name="name"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={value}
              label="Name"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Route name e.g Main Street"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="startPoint"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={value}
              label="Start point"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Start point e.g Juja"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="endPoint"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={value}
              label="End point"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="End point e.g CBD"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="distanceKm"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value} ?? ""`}
              keyboardType="numeric"
              label="Aproximate distance(Km)"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Distance in Km"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="estimatedTimeMin"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value} ?? ""`}
              keyboardType="numeric"
              label="Aproximate time(Mins)"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Time in Mins"
              error={error?.message}
            />
          )}
        />
        <Button
          title="Submit"
          onPress={form.handleSubmit(onSubmit)}
          loading={form.formState.isSubmitting}
        />
      </Box>
    </ScrollView>
  );
};

export default RouteForm;

const styles = StyleSheet.create({});
