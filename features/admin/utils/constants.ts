import { MenuItem } from "../types";

export const RoutePaths = Object.freeze({
  STAGES_LIST_SCREEN: "/(drawer)/admin/stages",
});
export const menuItems: MenuItem[] = [
  {
    name: "Stages",
    icon: { family: "FontAwesome", name: "server" },
    route: RoutePaths.STAGES_LIST_SCREEN,
    color: "#38b6ff",
  },
];
