import { ThemeContextKeys, ThemeSpec } from "./types";

export const BaseTheme: ThemeSpec = {
    [ThemeContextKeys.colorScheme]: "base",
    [ThemeContextKeys.textStyleScheme]: "base",
    [ThemeContextKeys.designTokenScheme]: "base",
    [ThemeContextKeys.resourceScheme]: "base",
};

export const BookingSGTheme: ThemeSpec = {
    [ThemeContextKeys.colorScheme]: "bookingsg",
    [ThemeContextKeys.textStyleScheme]: "base",
    [ThemeContextKeys.designTokenScheme]: "base",
    [ThemeContextKeys.resourceScheme]: "bookingsg",
};

export const RBSTheme: ThemeSpec = {
    [ThemeContextKeys.colorScheme]: "rbs",
    [ThemeContextKeys.textStyleScheme]: "base",
    [ThemeContextKeys.designTokenScheme]: "rbs",
    [ThemeContextKeys.resourceScheme]: "rbs",
};

export const MyLegacyTheme: ThemeSpec = {
    [ThemeContextKeys.colorScheme]: "mylegacy",
    [ThemeContextKeys.textStyleScheme]: "base",
    [ThemeContextKeys.designTokenScheme]: "base",
    [ThemeContextKeys.resourceScheme]: "base",
};

export * from "./types";
