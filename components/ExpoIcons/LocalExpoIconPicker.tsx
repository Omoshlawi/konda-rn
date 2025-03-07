import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { ExpoIcon, getExpoIconFamiliesNames, getExpoIcons } from "./helpers";
import ExpoIconPicker from "./ExpoIconPicker";

type LocalExpoIconPickerProps = {
  onSelectIcon?: (selected?: ExpoIcon) => void;
  selectedIcon?: ExpoIcon;
};

const LocalExpoIconPicker: FC<LocalExpoIconPickerProps> = ({
  onSelectIcon,
  selectedIcon,
}) => {
  const [iconFamily, seticonFamily] = useState<string>();
  return (
    <ExpoIconPicker
      onSearchIcon={async (search, category) => {
        return getExpoIcons([category as any]).filter((icon) =>
          icon.name.toLowerCase().includes(search?.toLowerCase() ?? "")
        );
      }}
      getIconFamilies={async () => getExpoIconFamiliesNames()}
      selectedIconFamily={iconFamily}
      onSelectIconFamily={seticonFamily}
      onSelectIcon={onSelectIcon}
      selectedIcon={selectedIcon}
    />
  );
};

export default LocalExpoIconPicker;

const styles = StyleSheet.create({});
