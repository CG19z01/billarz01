// Générique et agnostique de tout jeu : le moteur actif (src/gameEngines) définit
// ce que `type` et `payload` signifient. Le modèle partagé ne connaît aucune règle.
export interface MatchAction {
  id: string;
  timestamp: number;
  entryId?: string;
  type: string;
  payload?: Record<string, unknown>;
}
