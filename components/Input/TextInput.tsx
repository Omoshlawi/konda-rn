import React, { forwardRef, Ref } from "react";
import {
  Platform,
  TextInput as RNTextInput,
  StyleProp,
  ViewStyle,
  type TextInputProps as RNTextInputProps,
} from "react-native";
import InputDecoration, { InputDecorationProps } from "./InputDecoration";
import { useTheme } from "@/lib/theme";

export type TextInputProps = RNTextInputProps &
  InputDecorationProps & {
    inputDecorationStyle?: StyleProp<ViewStyle>;
  };

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      style,
      helperText,
      prefixIcon,
      suffixIcon,
      onPrefixIconPressed,
      onSuffixIconPressed,
      disabled = false,
      inputDecorationStyle,
      ...props
    },
    ref: Ref<RNTextInput>
  ) => {
    const theme = useTheme();
    const {
      colors: { hintColor, text },
      spacing,
    } = theme;

    return (
      <InputDecoration
        disabled={disabled}
        error={error}
        helperText={helperText}
        label={label}
        onPrefixIconPressed={onPrefixIconPressed}
        onSuffixIconPressed={onSuffixIconPressed}
        prefixIcon={prefixIcon}
        suffixIcon={suffixIcon}
        style={inputDecorationStyle}
        renderInput={({ onBlur, onFocus }) => (
          <RNTextInput
            ref={ref}
            editable={!disabled && props.editable}
            readOnly={disabled || props.readOnly}
            {...props}
            style={[
              {
                color: disabled ? hintColor : text,
                paddingVertical: spacing.s,
                // paddingHorizontal: spacing.s,
                width: "100%",
                // height: "100%",
              },
              Platform.OS === "web" && ({ outlineStyle: "none" } as any),
              style,
            ]}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor={hintColor}
            cursorColor={text}
          />
        )}
      />
    );
  }
);

export default TextInput;
