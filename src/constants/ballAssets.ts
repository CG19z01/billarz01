import type { ImageSourcePropType } from 'react-native';

// Point d'extension unique : dès qu'une vraie image est ajoutée dans
// assets/images/balls/ (voir le README de ce dossier), référence-la ici.
// `BilliardBallGraphic` l'utilise alors automatiquement à la place du rendu vectoriel.
// Pas d'image pour la boule blanche (0) : elle garde le rendu vectoriel.
export const BALL_IMAGE_OVERRIDES: Partial<Record<number, ImageSourcePropType>> = {
  1: require('../assets/images/balls/ball_1.png'),
  2: require('../assets/images/balls/ball_2.png'),
  3: require('../assets/images/balls/ball_3.png'),
  4: require('../assets/images/balls/ball_4.png'),
  5: require('../assets/images/balls/ball_5.png'),
  6: require('../assets/images/balls/ball_6.png'),
  7: require('../assets/images/balls/ball_7.png'),
  8: require('../assets/images/balls/ball_8.png'),
  9: require('../assets/images/balls/ball_9.png'),
  10: require('../assets/images/balls/ball_10.png'),
  11: require('../assets/images/balls/ball_11.png'),
  12: require('../assets/images/balls/ball_12.png'),
  13: require('../assets/images/balls/ball_13.png'),
  14: require('../assets/images/balls/ball_14.png'),
  15: require('../assets/images/balls/ball_15.png'),
};
