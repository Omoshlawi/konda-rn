import { AppBar, Logo, ThemedPageLayout, Box, Text } from "@/components";
import { ScrollView, StyleSheet } from "react-native";

import { RegisterForm } from "../forms";

export const RegistrationScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title={"Register"} />
      <Box flexDirection={"column"} flex={1} justifyContent={"center"}>
        <ScrollView style={{ flexGrow: 0 }}>
          <Box
            padding={"m"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"center"}
            gap={"m"}
            mb={"l"}
          >
            <Logo size={150} />
            <Text
              color={"text"}
              variant={"headlineLarge"}
              fontWeight={"700"}
              textAlign={"center"}
            >
              Sign Up
            </Text>
            <RegisterForm />
          </Box>
        </ScrollView>
      </Box>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});
