import { StyleSheet, Text, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import { Href, Redirect } from "expo-router";
import { useSession } from "@/lib/global-store";

interface OpenRouteProps extends PropsWithChildren {
  redirectTo?: Href;
}

const OpenRoute: FC<OpenRouteProps> = ({
  children,
  redirectTo = { pathname: "/(tabs)" },
}) => {
  const { isAuthenticated } = useSession();

  if (isAuthenticated) return <Redirect href={redirectTo as any} />;
  return children;
};

export default OpenRoute;

const styles = StyleSheet.create({});
