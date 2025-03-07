import { ExpoIconComponent, ListTile, SectionCard } from "@/components";
import React from "react";
import { useAuthAPi } from "../hooks";
import { ConfirmDialog, showDialog, showSnackbar } from "@/lib/overlays";

export const LogoutSection = () => {
  const { logoutUser } = useAuthAPi();
  const handleLogout = () => {
    const dispose = showDialog(
      <ConfirmDialog
        title="Logout"
        message="Are you sure you want to logout?"
        onCancel={() => dispose()}
        onConfirm={() => {
          dispose();
          logoutUser();
          showSnackbar({
            title: "success",
            subtitle: "Session ended succesfully",
          });
        }}
      />
    );
  };
  return (
    <SectionCard>
      <ListTile
        leading={<ExpoIconComponent family="AntDesign" name="logout" />}
        title="logout"
        subtitle="End current session"
        onPress={handleLogout}
        trailing={
          <ExpoIconComponent
            family="MaterialCommunityIcons"
            name="chevron-right"
          />
        }
      />
    </SectionCard>
  );
};
