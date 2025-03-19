import { ScrollView, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Fleet, FleetRoute, FleetRouteFormData } from "../types";
import { useRoutesApi, useFleetRoutes, useFleetApi, useRoutes } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FleetRouteSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { Box, Button, Dropdown, TextInput } from "@/components";

type Props = {
  fleet: Fleet;
  fleetRoute?: FleetRoute;
  onSuccess?: (fleetRoute: FleetRoute) => void;
};

const FleetRouteForm: FC<Props> = ({ fleet, onSuccess, fleetRoute }) => {
  const { createFleetRoute, updateFleetRoute } = useFleetApi();
  const { routes } = useRoutes();

  const form = useForm<FleetRouteFormData>({
    defaultValues: {
      routeId: fleetRoute?.routeId ?? "",
    },
    resolver: zodResolver(FleetRouteSchema),
  });

  const onSubmit: SubmitHandler<FleetRouteFormData> = async (data) => {
    try {
      const res = fleetRoute
        ? await updateFleetRoute(fleet.id, fleetRoute.id, data)
        : await createFleetRoute(fleet.id, data);
      onSuccess?.(res);
      mutate(`/fleet/${fleet.id}/routes`);
      showSnackbar({
        title: "Success",
        subtitle: `Fleet route ${
          fleetRoute ? "updated" : "created"
        } successfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<FleetRouteFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "Error", subtitle: e.detail, kind: "error" });
      } else {
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof FleetRouteFormData, { message: val })
        );
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box width={"100%"} gap={"m"} p={"m"}>
        <Controller
          control={form.control}
          name="routeId"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={routes}
              label="Route"
              labelAccessorKey="name"
              valueAccessorKey="id"
              onSelectedItemChange={({ id }) => onChange(id)}
              searchable
              selectedItem={routes.find(({ id }) => id === value)}
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

export default FleetRouteForm;

const styles = StyleSheet.create({});
