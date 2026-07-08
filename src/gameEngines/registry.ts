import { freeScoringEngine } from './freeScoring';
import { orderOfNumbersEngine } from './orderOfNumbers';
import type { GameEngine } from './types';

const ENGINES: Record<string, GameEngine> = {
  [orderOfNumbersEngine.gameTypeId]: orderOfNumbersEngine,
};

// Un jeu sans moteur enregistré retombe sur le moteur libre (aucune règle),
// pour ne jamais planter tant que ses règles réelles n'ont pas été fournies.
export function getGameEngine(gameTypeId: string): GameEngine {
  return ENGINES[gameTypeId] ?? freeScoringEngine;
}
