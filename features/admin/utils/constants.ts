import { MenuItem } from "../types";

export const RoutePaths = Object.freeze({
  STAGES_LIST_SCREEN: "/admin/stages",
  FLEETS_LIST_SCREEN: "/admin/fleets",
  OPERATORS_LIST_SCREEN: "/admin/operators",
  ROUTES_LIST_SCREEN: "/admin/routes",
});
export const menuItems: MenuItem[] = [
  {
    name: "Routes",
    icon: { family: "MaterialCommunityIcons", name: "road-variant" },
    route: RoutePaths.ROUTES_LIST_SCREEN,
    color: "#0d6ceb",
  },
  {
    name: "Fleets",
    icon: { family: "FontAwesome6", name: "bus" },
    route: RoutePaths.FLEETS_LIST_SCREEN,
    color: "#e809df",
  },
  {
    name: "Route stages",
    icon: { family: "MaterialCommunityIcons", name: "map-marker-path" },
    route: RoutePaths.ROUTES_LIST_SCREEN,
    color: "orange",
  },
  {
    name: "Stages",
    icon: { family: "MaterialIcons", name: "place" },
    route: RoutePaths.STAGES_LIST_SCREEN,
    color: "#38b6ff",
  },

  {
    name: "Operators",
    icon: { family: "MaterialIcons", name: "business-center" },
    route: RoutePaths.OPERATORS_LIST_SCREEN,
    color: "#09e81f",
  },
  {
    name: "Route Pricing",
    icon: { family: "MaterialIcons", name: "price-change" },
    route: RoutePaths.ROUTES_LIST_SCREEN,
    color: "aqua",
  },
];
