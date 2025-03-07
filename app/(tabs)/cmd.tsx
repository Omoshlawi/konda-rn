import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Dropdown,
  EmptyState,
  ErrorState,
  ImageViewer,
  Logo,
  TabView,
  ThemedPageLayout,
} from "@/components";
import { Link } from "expo-router";

const Command = () => {
  return (
    <ThemedPageLayout>
      <Logo />
      <ImageViewer source="https://picsum.photos/seed/696/3000/2000" />
      <ImageViewer />
      <View style={{ width: 100, height: 100 }}>
        <ErrorState message="Error" detail="error" />
      </View>
      <View style={{ width: 100, height: 100 }}>
        <EmptyState message="Error" />
      </View>
      <Dropdown.Select
        data={[{ label: "One", value: "1" }]}
        labelAccessorKey="label"
        valueAccessorKey="value"
        label="Dropdown"
        helperText="help text"
        searchable
      />
      <TabView
        routes={[
          { key: "one", title: "One" },
          { key: "two", title: "Two" },
        ]}
        scenes={{
          one: () => <Text>1</Text>,
          two: () => <Text>2</Text>,
        }}
        renderBadge={(route) => <Text>{route.title}</Text>}
      />
    </ThemedPageLayout>
  );
};

export default Command;

const styles = StyleSheet.create({});
