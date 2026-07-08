import { palette } from './palette';

/**
 * Android only supports `elevation` for real drop shadows; `shadowColor` is kept
 * alongside so tinted shadows still render on API 28+ devices that honor it.
 */
const createElevation = (level: number, shadowColor: string = '#000000') => ({
  elevation: level,
  shadowColor,
  shadowOpacity: 0.35,
  shadowRadius: level * 1.5,
  shadowOffset: { width: 0, height: level / 2 },
});

export const shadows = {
  card: createElevation(4),
  raised: createElevation(8),
  brassGlow: createElevation(6, palette.brass400),
} as const;
