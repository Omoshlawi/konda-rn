import { ScrollView, StyleSheet } from "react-native";

import { LoginForm } from "../forms";
import { AppBar, Box, ThemedPageLayout, Text, Logo } from "@/components";

export const LoginScreen = () => {
  return (
    <ThemedPageLayout>
      <AppBar title={"Login"} />

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
              Sign In
            </Text>
            <LoginForm />
          </Box>
        </ScrollView>
      </Box>
    </ThemedPageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    textDecorationColor: "",
    fontSize: 100,
    fontWeight: "400",
  },
});
