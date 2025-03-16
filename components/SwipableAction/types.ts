export type SwipableActionButton = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
  labelColor: string;
  accessibilityLabel: string;
  isLoading?: boolean | undefined;
};
