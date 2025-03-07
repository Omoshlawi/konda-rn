import React, { FC } from "react";
import { StyleSheet } from "react-native";
import ImageViewer from "./ImageViewer";
import { useUserPreferences } from "@/lib/global-store";

type LogoProps = {
  size?: number;
};
const Logo: FC<LogoProps> = ({ size = 100 }) => {
  const {
    userPreferences: { theme },
  } = useUserPreferences();

  if (theme === "light")
    return (
      <ImageViewer
        source={require("@/assets/images/logo-light.png")}
        style={[styles.logo, { width: size, height: size }]}
      />
    );

  return (
    <ImageViewer
      source={require("@/assets/images/logo-dark.png")}
      style={[styles.logo, { width: size, height: size }]}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
