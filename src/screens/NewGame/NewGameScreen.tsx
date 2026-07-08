import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, ScreenContainer } from '../../components/common';
import { PlayerCountSelector } from '../../components/players';
import { useNewGameSetup } from '../../hooks/useNewGameSetup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

export function NewGameScreen({ navigation }: Props) {
  const { playerCount, setPlayerCount } = useNewGameSetup();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AppText variant="label" color={colors.accent.default}>
          Nouvelle partie
        </AppText>
        <AppText variant="heading1" style={styles.title}>
          Combien de joueurs ?
        </AppText>
        <PlayerCountSelector value={playerCount} onChange={setPlayerCount} />
      </View>

      <Button label="Suivant" onPress={() => navigation.navigate('PlayerSetup')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
