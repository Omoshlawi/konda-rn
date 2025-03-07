export interface User {
  id: string;
  username: string;
  profileUpdated: boolean;
  accountVerified?: string;
  voided: boolean;
  isAdmin: boolean;
  password: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  person: Person;
}

export interface Person {
  id: string;
  firstName?: string;
  lastName?: string;
  surname?: string;
  userId: string;
  avatarUrl?: string;
  phoneNumber: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
  name?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export type Session = {
  isAuthenticated: boolean;
  user?: User;
  token?: TokenPair;
  isGuestUser: boolean;
};

export type ThemeName = "dark" | "light" | "system";

export type UserPreference = {
  theme: ThemeName;
};

export type Overlay = {
  id: string;
  component?: React.ReactElement;
  type: "snackbar" | "modal";
  modalOptions?: {
    transparent?: boolean;
    dismissable?: boolean;
    animation?: "none" | "slide" | "fade";
  };
};
