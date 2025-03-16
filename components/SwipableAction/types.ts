import { ReactNode } from "react";

export interface SwipableActionButton {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  labelColor: string;
  accessibilityLabel: string;
  isLoading?: boolean; // Optional
  icon?: ReactNode; // Optional
  iconPosition?: "top" | "bottom" | "left" | "right"; // Optional
  disableWhenLoading?: boolean; // Optional
  style?: any; // Optional
  textStyle?: any; // Optional
  loadingIndicatorColor?: string; // Optional
}
