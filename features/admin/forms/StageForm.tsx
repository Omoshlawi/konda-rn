import React, { FC, useEffect, useMemo } from "react";
import { Stage, StageFormData } from "../types";
import { useAddresses, useStagesApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StagesShema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { Box, Button, Dropdown, TextInput, Text } from "@/components";
import { ScrollView } from "react-native";

type Props = {
  stage?: Stage;
  onSuccess?: (stage: Stage) => void;
};

const StageForm: FC<Props> = ({ onSuccess, stage }) => {
  const { createStage, updateStage } = useStagesApi();
  const { address, error, isLoading } = useAddresses();
  const form = useForm<StageFormData>({
    defaultValues: {
      countyCode: stage?.countyCode ?? "",
      latitude: stage?.latitude ? Number(stage.latitude) : undefined,
      longitude: stage?.longitude ? Number(stage.longitude) : undefined,
      name: stage?.name ?? "",
      radius: stage?.radius ? Number(stage.radius) : undefined,
      subCountyCode: stage?.subCountyCode ?? "",
    },
    resolver: zodResolver(StagesShema),
  });
  const observableCounty = form.watch("countyCode");
  useEffect(() => {
    form.resetField("subCountyCode");
  }, [observableCounty, form]);

  const subcounties = useMemo(() => {
    return (
      address.find(({ code }) => code === observableCounty)?.subCounties ?? []
    );
  }, [observableCounty]);
  const onSubmit: SubmitHandler<StageFormData> = async (data) => {
    try {
      const res = stage
        ? await updateStage(stage?.id, data)
        : await createStage(data);
      onSuccess?.(res);
      mutate("/stage");
      showSnackbar({
        title: "succes",
        subtitle: `amenity ${stage ? "updated" : "created"} succesfull`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<StageFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof StageFormData, { message: val })
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
              placeholder="Stage name e.g Allsops"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="radius"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value ?? ""}`}
              keyboardType="numeric"
              label="Radius"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Stage name e.g Allsops"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="countyCode"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={address}
              label="County"
              labelAccessorKey="name"
              valueAccessorKey="code"
              onSelectedItemChange={({ code }) => onChange(code)}
              searchable
              selectedItem={address.find(({ code }) => code === value)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="subCountyCode"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <Dropdown.Select
              error={error?.message}
              data={subcounties}
              label="Subcounty"
              labelAccessorKey="name"
              valueAccessorKey="code"
              onSelectedItemChange={({ code }) => onChange(code)}
              searchable
              selectedItem={subcounties.find(({ code }) => code === value)}
            />
          )}
        />
        <Controller
          control={form.control}
          name="longitude"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value ?? ""}`}
              keyboardType="numeric"
              label="Longitude"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Enter longitude"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="latitude"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={`${value ?? ""}`}
              keyboardType="numeric"
              label="Latitude"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Enter latitude"
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

export default StageForm;
