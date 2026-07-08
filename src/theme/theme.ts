import { colors } from './colors';
import { shadows } from './shadows';
import { borderWidth, radius, spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  borderWidth,
  shadows,
} as const;

export type Theme = typeof theme;
