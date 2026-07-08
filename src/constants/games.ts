import { ORDER_OF_NUMBERS_GAME_ID } from '../gameEngines';
import type { GameType } from '../models';

export const GAME_TYPES: GameType[] = [
  {
    id: ORDER_OF_NUMBERS_GAME_ID,
    name: "L'Ordre des Numéros",
    description: 'Empochez les boules 1 à 15, la noire doit sortir en dernière.',
  },
];
