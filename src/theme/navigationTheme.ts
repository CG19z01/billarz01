import { DarkTheme, type Theme as NavigationThemeType } from '@react-navigation/native';

import { colors } from './colors';

export const navigationTheme: NavigationThemeType = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent.default,
    background: colors.background.default,
    card: colors.background.elevated,
    text: colors.text.primary,
    border: colors.border.default,
    notification: colors.feedback.warning,
  },
};
