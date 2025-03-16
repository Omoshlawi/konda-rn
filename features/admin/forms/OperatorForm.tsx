import { Box, Button, TextInput } from "@/components";
import { handleApiErrors, mutate } from "@/lib/api";
import { showSnackbar } from "@/lib/overlays";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useOperatorsApi } from "../hooks";
import { Operator, OperatorFormData } from "../types";
import { OperatorSchema } from "../utils/validation";

type Props = {
  operator?: Operator;
  onSuccess?: (operator: Operator) => void;
};

const OperatorForm: FC<Props> = ({ onSuccess, operator }) => {
  const { createOperator, updateOperator } = useOperatorsApi();
  const form = useForm<OperatorFormData>({
    defaultValues: {
      contact: operator?.contact ?? "",
      name: operator?.name ?? "",
    },
    resolver: zodResolver(OperatorSchema),
  });
  const onSubmit: SubmitHandler<OperatorFormData> = async (data) => {
    try {
      const res = operator
        ? await updateOperator(operator?.id, data)
        : await createOperator(data);
      onSuccess?.(res);
      mutate("/operator");
      showSnackbar({
        title: "success",
        subtitle: `operator ${operator ? "updated" : "created"} successfully`,
        kind: "success",
      });
    } catch (error) {
      const e = handleApiErrors<OperatorFormData>(error);
      if (e.detail) {
        showSnackbar({ title: "error", subtitle: e.detail, kind: "error" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof OperatorFormData, { message: val })
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
              placeholder="Operator name e.g John Doe"
              error={error?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="contact"
          render={({
            field: { onChange, value, disabled },
            fieldState: { error },
          }) => (
            <TextInput
              value={value}
              keyboardType="numeric"
              label="Contact"
              readOnly={disabled}
              onChangeText={onChange}
              placeholder="Enter contact e.g 25412345678"
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

export default OperatorForm;
