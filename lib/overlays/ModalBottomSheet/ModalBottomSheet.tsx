import { Modal, Pressable, StyleSheet, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/lib/theme";
import { Text } from "@/components";

interface ModalBottomSheetProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

const ModalBottomSheet: FC<ModalBottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  title = "",
}) => {
  const theme = useTheme();
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={[
          styles.modalContent,
          {
            height: "25%",
            backgroundColor: theme.colors.skeleton, //"#25292e",
            borderTopRightRadius: theme.borderRadii.large,
            borderTopLeftRadius: theme.borderRadii.large,
          },
        ]}
      >
        <View
          style={[
            styles.titleContainer,
            {
              backgroundColor: theme.colors.onSkeleton, // "#464C55",
              borderTopRightRadius: theme.borderRadii.large,
              borderTopLeftRadius: theme.borderRadii.large,
              paddingHorizontal: theme.spacing.m,
            },
          ]}
        >
          <Text variant={"titleMedium"} color="text" p={"m"}>
            {title}
          </Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default ModalBottomSheet;

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
