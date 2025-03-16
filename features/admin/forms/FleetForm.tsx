import React, { FC, useEffect, useMemo } from "react";
import { Fleet, FleetFormData } from "../types";
import { useAddresses, useFleetApi, useOperators } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FleetSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { Box, Button, Dropdown, TextInput } from "@/components";
import { ScrollView } from "react-native";

type Props = {
  fleet?: Fleet;
  onSuccess?: (fleet: Fleet) => void;
};

const FleetForm: FC<Props> = ({ onSuccess, fleet }) => {
  const { createFleet, updateFleet } = useFleetApi();
  const { operators } = useOperators();
  const form = useForm<FleetFormData>({
    defaultValues: {
      name: fleet?.name ?? "",
      capacity: fleet?.capacity,
      operatorId: fleet?.operatorId ?? "",
      plateNumber: fleet?.plateNumber ?? "",
      status: fleet?.status ?? "Active",
      vehicleType: fleet?.vehicleType ?? "Bus",
    },
    resolver: zodResolver(FleetSchema),
  });

  const onSubmit: SubmitHandler<FleetFormData> = async (data) => {
    try {
      const res = fleet
        ? await updateFleet(fleet?.id, data)
        : await createFleet(data);
      onSuccess?.(res);
      mutate("/fleet");
      showSnackbar({
        title: "success",
        subtitle: `Fleet ${fleet ? "updated" : "created"} successfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<FleetFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof FleetFormData, { message: val })
        );
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
              placeholder="Fleet name e.g Allsops"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="capacity"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value ?? ""}`}
              keyboardType="numeric"
              label="Capacity"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Enter capacity"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="operatorId"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={operators}
              label="Operator"
              labelAccessorKey="name"
              valueAccessorKey="id"
              onSelectedItemChange={({ id }) => onChange(id)}
              searchable
              selectedItem={operators.find(({ id }) => id === value)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="plateNumber"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={value}
              label="Plate Number"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Enter plate number e.g KDJ 123K"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="status"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Maintenance", value: "Maintenance" },
              ]}
              label="Status"
              labelAccessorKey="label"
              valueAccessorKey="value"
              onSelectedItemChange={({ value }) => onChange(value)}
              selectedItem={{ label: value, value }}
            />
          )}
        />
        <Controller
          control={form.control}
          name="vehicleType"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={[
                { label: "Bus", value: "Bus" },
                { label: "Matatu", value: "Matatu" },
                { label: "Shuttle", value: "Shuttle" },
              ]}
              label="Vehicle Type"
              labelAccessorKey="label"
              valueAccessorKey="value"
              onSelectedItemChange={({ value }) => onChange(value)}
              selectedItem={{ label: value, value }}
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

export default FleetForm;
