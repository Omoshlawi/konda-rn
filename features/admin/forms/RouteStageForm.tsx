import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Route, RouteStage, RouteStageFormData } from "../types";
import { useRoutesApi, useRouteStages, useStages } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteStageschema } from "../utils/validation";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { Box, Button, Dropdown, TextInput } from "@/components";

type Props = {
  route: Route;
  routeStage?: RouteStage;
  onSuccess?: (routeStage: RouteStage) => void;
};

const RouteStageForm: FC<Props> = ({ route, onSuccess, routeStage }) => {
  const { createRouteStage, updateRouteStage } = useRoutesApi();
  const { stages } = useStages();
  const { routeStages } = useRouteStages(route.id);

  const form = useForm<RouteStageFormData>({
    defaultValues: {
      order: routeStage?.order ?? (routeStages?.length ?? 0) + 1,
      routeId: route.id,
      stageId: routeStage?.stageId,
    },
    resolver: zodResolver(RouteStageschema),
  });

  const onSubmit: SubmitHandler<RouteStageFormData> = async (data) => {
    try {
      // Assuming createRoute and updateRoute are defined in useRoutesApi
      const res = routeStage
        ? await updateRouteStage(route.id, routeStage.id, data)
        : await createRouteStage(route.id, data);
      onSuccess?.(res);
      mutate(`/route/${route.id}/stages`);
      showSnackbar({
        title: "success",
        subtitle: `Route stage ${
          routeStage ? "updated" : "created"
        } successfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<RouteStageFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else {
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RouteStageFormData, { message: val })
        );
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box width={"100%"} gap={"m"} p={"m"}>
        <Controller
          control={form.control}
          name="order"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value ?? ""}`}
              keyboardType="numeric"
              label="Order"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="e.g 1"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="stageId"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={stages}
              label="Stage"
              labelAccessorKey="name"
              valueAccessorKey="id"
              onSelectedItemChange={({ id }) => onChange(id)}
              searchable
              selectedItem={stages.find(({ id }) => id === value)}
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

export default RouteStageForm;

const styles = StyleSheet.create({});
