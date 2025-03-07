import { AppBar, Box, ExpoIconComponent, ThemedPageLayout } from "@/components";
import Constants from "expo-constants";
import React, { FC, PropsWithChildren, ReactNode, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface ClickableModalWrapperProps extends PropsWithChildren {
  renderContent: (dismiss?: () => void) => ReactNode;
  onRequestClose?: () => boolean;
  title: string;
  renderActions?: (dismiss?: () => void) => ReactNode;
}

const ClickableModalWrapper: FC<ClickableModalWrapperProps> = ({
  children,
  onRequestClose,
  title,
  renderActions,
  renderContent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleDismiss = () => setShowModal(false);
  return (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setShowModal(true)}>
        {children}
      </TouchableOpacity>
      <Modal
        visible={showModal}
        onRequestClose={() => {
          if (onRequestClose?.() === true) {
            handleDismiss();
          }
        }}
        animationType="slide"
        accessibilityLabel="Close modal"
        accessibilityRole="button"
      >
        <ThemedPageLayout withSafeArea={false}>
          <View style={[styles.safeArea]}>
            <AppBar
              title={title}
              actions={renderActions?.(handleDismiss)}
              leading={
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setShowModal(false)}
                >
                  <ExpoIconComponent
                    family="Ionicons"
                    name="arrow-back"
                    size={28}
                  />
                </TouchableOpacity>
              }
            />
            <Box flex={1} backgroundColor={"background"}>
              {renderContent(handleDismiss)}
            </Box>
          </View>
        </ThemedPageLayout>
      </Modal>
    </>
  );
};

export default React.memo(ClickableModalWrapper);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
