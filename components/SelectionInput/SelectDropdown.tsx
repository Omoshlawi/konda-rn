import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInputProps } from "../Input";
import { debounce } from "lodash";
import { Path } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import Box from "../Box";
import Text from "../Text";
import Color from "color";

type Props<TData extends Record<string, any>> = Pick<
  TextInputProps,
  | "prefixIcon"
  | "onPrefixIconPressed"
  | "suffixIcon"
  | "onSuffixIconPressed"
  | "label"
  | "disabled"
  | "error"
  | "helperText"
> & {
  data?: TData[];
  searchable?: boolean;
  renderItem?: (item: TData, selected?: boolean) => React.ReactElement;
  mode?: "auto" | "default" | "modal";
  labelAccessorKey: Path<TData>;
  valueAccessorKey: Path<TData>;
  searchAccessorKey?: Path<TData>;
  onSelectedItemChange?: (item: TData & { _index: number }) => void | undefined;
  selectedItem?: TData;
  onAsyncSearch?: (search: string) => Promise<void>;
};

const SelectDropdown = <TData extends Record<string, any>>({
  data = [],
  prefixIcon,
  onPrefixIconPressed,
  searchable = false,
  onSuffixIconPressed,
  suffixIcon,
  label,
  disabled,
  error,
  helperText,
  renderItem,
  mode,
  labelAccessorKey,
  valueAccessorKey,
  onSelectedItemChange,
  selectedItem,
  searchAccessorKey,
  onAsyncSearch,
}: Props<TData>) => {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const handleSearch = debounce(async (search: string) => {
    if (typeof onAsyncSearch === "function") {
      await onAsyncSearch(search);
    }
  }, 300); // 300ms delay to reduce unnecessary API calls

  return (
    <Box width={"100%"} gap={"s"}>
      {label && (
        <Text variant={"bodyMedium"} color={disabled ? "hintColor" : "text"}>
          {label}
        </Text>
      )}
      <Dropdown
        containerStyle={{
          backgroundColor: Color(theme.colors.background)
            .blacken(0.5)
            .toString(),
          borderWidth: 0,
          shadowColor: theme.colors.outline,
          borderRadius: theme.borderRadii.small,
          ...Platform.select({
            ios: {
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        itemTextStyle={{
          ...theme.textVariants.bodyMedium,
          fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          color: theme.colors.text,
        }}
        disable={disabled}
        flatListProps={{ style: { backgroundColor: "transparent" } }}
        style={[
          styles.dropdown,
          {
            borderColor: isFocus ? theme.colors.primary : theme.colors.outline,
            borderRadius: theme.borderRadii.small,
            padding: theme.spacing.s,
            gap: theme.spacing.s,
          },
        ]}
        placeholderStyle={{
          ...theme.textVariants.bodyMedium,
          fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          color: theme.colors.hintColor,
        }}
        selectedTextStyle={{
          ...theme.textVariants.bodyMedium,
          fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          color: theme.colors.text,
        }}
        renderItem={renderItem}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {
            ...theme.textVariants.bodyMedium,
            fontWeight: theme.textVariants.bodyMedium.fontWeight as any,
          },
        ]}
        activeColor={Color(theme.colors.primary).alpha(0.2).toString()}
        searchPlaceholderTextColor={theme.colors.hintColor}
        iconStyle={[styles.iconStyle]}
        mode={mode}
        iconColor={theme.colors.icon}
        data={data}
        search={searchable}
        maxHeight={300}
        labelField={labelAccessorKey as string | number | symbol}
        valueField={valueAccessorKey as string | number | symbol}
        searchField={searchAccessorKey as string | number | symbol | undefined}
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={selectedItem}
        onChange={(item: TData & { _index: number }) => {
          onSelectedItemChange?.(item);
        }}
        onChangeText={handleSearch}
        searchQuery={(keyword, label) => {
          // Prevent local search when async search is defined
          if (typeof onAsyncSearch === "function") {
            return true;
          }
          return label.toLowerCase().includes(keyword.toLowerCase());
        }}
        renderLeftIcon={
          prefixIcon
            ? () => (
                <TouchableOpacity onPress={onPrefixIconPressed}>
                  {prefixIcon}
                </TouchableOpacity>
              )
            : undefined
        }
        renderRightIcon={
          suffixIcon
            ? () => (
                <TouchableOpacity onPress={onSuffixIconPressed}>
                  {suffixIcon}
                </TouchableOpacity>
              )
            : undefined
        }
      />
      {(error || helperText) && (
        <Text variant={"bodySmall"} color={error ? "error" : "hintColor"}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
};

export default SelectDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
