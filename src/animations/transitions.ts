import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Transition douce pour les moments de "révélation" (ex. Splash -> Accueil),
// le reste de l'app garde le slide natif standard de la plateforme.
export const fadeTransition: NativeStackNavigationOptions = {
  animation: 'fade',
};
