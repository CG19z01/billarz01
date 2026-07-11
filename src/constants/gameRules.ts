import { ORDER_OF_NUMBERS_GAME_ID } from '../gameEngines';

export interface GameRulesContent {
  objective: string;
  mainRules: string[];
  victory: string;
}

// Contenu texte affiché sur l'écran des règles — une synthèse du moteur de jeu
// (src/gameEngines/orderOfNumbers/), pas une règle officielle du billard.
export const GAME_RULES: Record<string, GameRulesContent> = {
  [ORDER_OF_NUMBERS_GAME_ID]: {
    objective: 'Empochez les boules numérotées 1 à 15, la noire (8) doit sortir en dernière.',
    mainRules: [
      'Les boules 1 à 15 peuvent être empochées dans l\'ordre de votre choix — chacune rapporte des points égaux à son numéro.',
      'La boule noire (8) ne doit être empochée qu\'en dernier, une fois toutes les autres boules sorties.',
      'Si la noire est empochée trop tôt, elle ne rapporte aucun point et son auteur perd la partie.',
      'Une boule sortie du jeu sans être empochée (hors-jeu) ne rapporte aucun point et passe la main.',
      'La boule noire rapporte 8 points, plus 8 points supplémentaires par bande jouée avant qu\'elle ne tombe.',
    ],
    victory:
      'Le joueur avec le plus de points l\'emporte. En cas d\'égalité, l\'auteur de la boule noire gagne s\'il fait partie des joueurs à égalité ; sinon, c\'est celui qui a empoché la boule juste avant la noire.',
  },
};
