import { theme } from "core/Theme";

export const screens = {
  smallMobile: theme.screens.smallMobile,
  mobile: theme.screens.mobile,
  tablet: theme.screens.tablet,
  smallDesktop: theme.screens.smallDesktop,
  specialScreen: theme.screens.specialScreen,
  desktop: theme.screens.desktop,
  maxDesktop: theme.screens.maxDesktop,
};

export const greaterThan = (key: keyof typeof screens) => {
  return (style: TemplateStringsArray | string) =>
    `@media (min-width: ${screens[key]}px) { ${style} }`;
};

export const lessThan = (key: keyof typeof screens) => {
  return (style: TemplateStringsArray | string) =>
    `@media (max-width: ${screens[key]}px) { ${style} }`;
};

export const between = (
  min: keyof typeof screens,
  max: keyof typeof screens
) => {
  return (style: TemplateStringsArray | string) =>
    `@media (min-width: ${screens[min]}px)
      and (max-width: ${screens[max]}px) { ${style} }`;
};
