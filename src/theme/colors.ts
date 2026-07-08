import { palette } from './palette';

export const colors = {
  background: {
    default: palette.walnut950,
    elevated: palette.walnut900,
    surface: palette.walnut800,
    felt: palette.felt900,
  },
  border: {
    subtle: 'rgba(212, 175, 55, 0.18)',
    default: 'rgba(212, 175, 55, 0.35)',
    strong: palette.brass400,
  },
  text: {
    primary: palette.cream100,
    secondary: palette.parchment300,
    muted: palette.smoke400,
    onAccent: palette.walnut950,
  },
  accent: {
    default: palette.brass400,
    pressed: palette.brass600,
    subtle: 'rgba(212, 175, 55, 0.12)',
  },
  leather: {
    default: palette.leather600,
    pressed: palette.leather500,
  },
  feedback: {
    success: palette.emerald500,
    warning: palette.ember500,
    danger: palette.garnet500,
  },
  overlay: 'rgba(10, 7, 5, 0.6)',
  // Couleurs d'identité des équipes, utilisées par index (pas de sens sémantique individuel).
  team: [palette.brass400, palette.emerald500, palette.garnet500, palette.slate500],
} as const;

export type Colors = typeof colors;
