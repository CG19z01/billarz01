import { BLACK_BALL_NUMBER } from './constants';

// Toutes les boules rapportent leur numéro, sauf la noire dont la valeur
// dépend du nombre de bandes choisi : 8 + (bandes × 8).
export function getBallValue(ballNumber: number, cushions?: number): number {
  if (ballNumber === BLACK_BALL_NUMBER) {
    return BLACK_BALL_NUMBER + (cushions ?? 0) * BLACK_BALL_NUMBER;
  }
  return ballNumber;
}
