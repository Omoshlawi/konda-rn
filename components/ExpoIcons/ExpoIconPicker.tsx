import React, { FC, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
} from "react-native";
import { ExpoIcon, ExpoIconComponent } from "./helpers";
import { TextInput } from "../Input";
import debounce from "lodash/debounce";
import { useApi } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import Box from "../Box";
import Text from "../Text";

type ExpoIconPickerProps = {
  onSelectIcon?: (selected?: ExpoIcon) => void;
  selectedIcon?: ExpoIcon;
  onSearchIcon?: (
    nameSearchText?: string,
    family?: string
  ) => Promise<ExpoIcon[]>;
  selectedIconFamily?: string;
  onSelectIconFamily?: (selected: string) => void;
  getIconFamilies?: () => Promise<string[]>;
};

const ExpoIconPicker: FC<ExpoIconPickerProps> = ({
  onSelectIcon,
  onSearchIcon,
  selectedIcon,
  selectedIconFamily = "MaterialIcons",
  getIconFamilies,
  onSelectIconFamily,
}) => {
  const ref = useRef<RNTextInput>(null);
  const {
    data: iconsFamiliesNames,
    error: familyError,
    isLoading: familyLoading,
    mutate: mutateFamily,
  } = useApi(
    typeof getIconFamilies === "function" ? "__getIconFamilyNames__" : null,
    async () => {
      return getIconFamilies!();
    }
  );
  const theme = useTheme();
  const [icons, seticons] = useState<ExpoIcon[]>([]);

  // Add useEffect to fetch icons when selectedIconFamily changes
  React.useEffect(() => {
    const fetchInitialIcons = async () => {
      if (typeof onSearchIcon === "function") {
        // Fetch icons for the selected family when it changes
        ref.current?.clear();
        const initialIcons = await onSearchIcon("", selectedIconFamily);
        seticons(initialIcons);
      }
    };

    fetchInitialIcons();
  }, [selectedIconFamily, onSearchIcon]);

  const handleSearchIcon = debounce(async (search: string) => {
    if (typeof onSearchIcon === "function") {
      const searchResults = await onSearchIcon(search, selectedIconFamily);
      seticons(searchResults);
    }
  }, 300); // 300ms delay to reduce unnecessary API calls
  const handleIconSelect = (icon: ExpoIcon) => {
    onSelectIcon?.(icon);
  };

  const handleSelectIconFamily = (family: string) => {
    if (typeof onSelectIconFamily === "function") {
      onSelectIconFamily!(family);
    }
  };

  return (
    <Box flex={1} gap={"m"} flexDirection={"column"} p={"m"}>
      {/* Search Input */}
      <TextInput
        placeholder="Search icons..."
        onChangeText={handleSearchIcon}
        ref={ref}
        // style={{ marginTop: theme.spacing.m }}
        label="Search"
        helperText="Search by name, filter by category"
      />
      {/* Icon Family Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        {iconsFamiliesNames?.map((family) => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Select ${family} icon family`}
            key={family}
            onPress={() => handleSelectIconFamily(family)}
            style={{
              padding: 8,
              marginRight: 8,
              backgroundColor:
                family === selectedIconFamily
                  ? theme.colors.primary
                  : theme.colors.disabledColor,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: family === selectedIconFamily ? "white" : "black",
                fontSize: 12,
              }}
            >
              {family}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Icon Display */}
      {selectedIcon && (
        <Box
          flexDirection={"row"}
          alignItems={"center"}
          p={"m"}
          backgroundColor={"primaryContainer"}
          borderRadius={"medium"}
          marginVertical={"m"}
        >
          <ExpoIconComponent {...selectedIcon} color={theme.colors.primary} />
          <Text style={{ marginLeft: 8 }}>
            {selectedIcon.family} / {selectedIcon.name}
          </Text>
        </Box>
      )}

      {/* Icons Grid */}

      <FlatList
        data={icons}
        style={{ flex: 1 }}
        keyExtractor={(icon) => `${icon.name}-${icon.family}`}
        numColumns={4}
        initialNumToRender={8} // Render fewer items initially
        maxToRenderPerBatch={10} // Limit render batch size
        windowSize={5} // Adjust rendering window
        removeClippedSubviews={true} // Improve memory performance
        renderItem={({ item: icon }) => (
          <TouchableOpacity
            onPress={() => handleIconSelect(icon)}
            style={{
              width: "23%",
              aspectRatio: 1,
              padding: 8,
              marginBottom: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedIcon?.name === icon.name
                  ? theme.colors.primaryContainer
                  : "transparent",
              borderRadius: 8,
              borderWidth: selectedIcon?.name === icon.name ? 2 : 0,
              borderColor: "#007AFF",
            }}
          >
            <ExpoIconComponent
              {...icon}
              color={
                selectedIcon?.name === icon.name
                  ? theme.colors.primary
                  : theme.colors.icon
              }
            />
            <Text
              numberOfLines={1}
              color={"text"}
              style={{
                fontSize: 10,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {icon.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Box>
  );
};

export default React.memo(ExpoIconPicker);
