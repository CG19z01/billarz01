import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import { AppText, Button, ScreenContainer } from '../../components/common';
import { PlayerNameInput } from '../../components/players';
import { useNewGameSetup } from '../../hooks/useNewGameSetup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerSetup'>;

export function PlayerSetupScreen({ navigation }: Props) {
  const { players, setPlayerName, canProceedToTeamSetup } = useNewGameSetup();

  return (
    <ScreenContainer>
      <AppText variant="label" color={colors.accent.default}>
        Joueurs
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        Noms des joueurs
      </AppText>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <PlayerNameInput
            key={player.id}
            index={index}
            value={player.name}
            onChangeText={(text) => setPlayerName(player.id, text)}
          />
        ))}
      </ScrollView>

      <Button
        label="Suivant"
        disabled={!canProceedToTeamSetup}
        onPress={() => navigation.navigate('TeamSetup')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  list: {
    flex: 1,
  },
});
