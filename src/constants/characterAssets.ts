import type { ImageSourcePropType } from 'react-native';

import type { CharacterVariant } from '../components/characters/CharacterGraphic';

// Point d'extension unique : dès qu'une vraie image est ajoutée dans
// assets/images/characters/ (voir le README de ce dossier), référence-la ici.
// `CharacterGraphic` l'utilise alors automatiquement à la place du rendu
// vectoriel. Vide par défaut : le rendu SVG couvre tous les cas.
export const CHARACTER_IMAGE_OVERRIDES: Partial<Record<CharacterVariant, ImageSourcePropType>> =
  {};
