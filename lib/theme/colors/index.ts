const white = "#FFFFFF";

const lightGrey = "#F2F4F7";
const darkGrey = "#E4E5E8";

const lightBlue = "#ECF6FE";
const darkBlue = "#295DB0";
const blue = "#275CB2";

const lightBlack = "#11181C";
const black = "#000000";
const dark = "#25292e";
const lightRed = "#E99B90";
const darkRed = "#AB4031";

const lightGreen = "#A1CD74";
const darkGreen = "#40651F";

const greyBlue = "#636B7C";
const tertiaryGray = "#636B7C";

export const pallet = {
  white,
  lightGrey,
  darkGrey,
  lightBlue,
  darkBlue,
  blue,
  black,
  lightRed,
  darkRed,
  lightGreen,
  darkGreen,
  lightBlack,
  dark,
  greyBlue,
  tertiaryGray,
};

export const microTheme = {
  light: {
    text: lightBlack,
    background: white,
    tint: blue,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: blue,
  },
  dark: {
    text: lightBlack,
    background: white,
    tint: blue,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: blue,
  },
} as const;
export * from "./dark";
export * from "./light";
