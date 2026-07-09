import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { fadeTransition } from '../animations';
import { AboutScreen } from '../screens/About';
import { GameDetailScreen } from '../screens/GameDetail';
import { GameSelectionScreen } from '../screens/GameSelection';
import { HistoryScreen } from '../screens/History';
import { HomeScreen } from '../screens/Home';
import { MatchScreen } from '../screens/Match';
import { NewGameScreen } from '../screens/NewGame';
import { PlayerSetupScreen } from '../screens/PlayerSetup';
import { SettingsScreen } from '../screens/Settings';
import { SplashScreen } from '../screens/Splash';
import { TeamSetupScreen } from '../screens/TeamSetup';
import { colors, fontFamily } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        contentStyle: { backgroundColor: colors.background.default },
        headerStyle: { backgroundColor: colors.background.elevated },
        headerTintColor: colors.accent.default,
        headerTitleStyle: { color: colors.text.primary, fontFamily: fontFamily.displaySemiBold },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, ...fadeTransition }}
      />
      <Stack.Screen
        name="GameSelection"
        component={GameSelectionScreen}
        options={{ title: 'Choix du jeu' }}
      />
      <Stack.Screen
        name="NewGame"
        component={NewGameScreen}
        options={{ title: 'Nouvelle partie' }}
      />
      <Stack.Screen
        name="PlayerSetup"
        component={PlayerSetupScreen}
        options={{ title: 'Joueurs' }}
      />
      <Stack.Screen name="TeamSetup" component={TeamSetupScreen} options={{ title: 'Équipes' }} />
      <Stack.Screen name="Match" component={MatchScreen} options={{ title: 'Partie' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historique' }} />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{ title: 'Détail de la partie' }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'À propos' }} />
    </Stack.Navigator>
  );
}
