/**
 * Raw color values. Never import this outside of `theme/colors.ts` —
 * screens and components must use the semantic `colors` object instead.
 */
export const palette = {
  walnut950: '#140d09',
  walnut900: '#1c130d',
  walnut800: '#2a1c13',
  walnut700: '#3b2a1c',
  walnut600: '#4e3a26',

  felt900: '#0b2e22',
  felt800: '#0f4531',
  felt700: '#15603f',

  brass300: '#e2c56b',
  brass400: '#d4af37',
  brass500: '#c9a227',
  brass600: '#a8841e',

  leather600: '#5c3a24',
  leather500: '#734a2c',

  cream100: '#f5ecd9',
  cream200: '#efe0c0',
  parchment300: '#d8c7a1',

  smoke400: '#a08d74',
  smoke600: '#6f6152',

  ember500: '#e8a33d',
  emerald500: '#3f8f63',
  garnet500: '#9c3b3b',
  slate500: '#4f6f93',
} as const;
