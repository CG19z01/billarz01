import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CharacterBust } from '../../components/characters';
import {
  AppText,
  BackButton,
  Button,
  PoolTableGraphic,
  ScreenContainer,
  SetupProgressDots,
} from '../../components/common';
import { PlayerNameInput } from '../../components/players';
import { useNewGameSetup } from '../../hooks/useNewGameSetup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerSetup'>;

const BUST_SIZE = 48;

export function PlayerSetupScreen({ navigation }: Props) {
  const { players, setPlayerName, canProceedToTeamSetup } = useNewGameSetup();
  const [focusedPlayerId, setFocusedPlayerId] = useState<string | undefined>(undefined);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <AppText variant="label" color={colors.accent.default}>
        Joueurs
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        Noms des joueurs
      </AppText>

      <PoolTableGraphic height={110}>
        <View style={styles.bustRow}>
          {players.map((player) => (
            <CharacterBust
              key={player.id}
              name={player.name}
              variant={player.id === focusedPlayerId ? 'active' : 'default'}
              size={BUST_SIZE}
            />
          ))}
        </View>
      </PoolTableGraphic>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <PlayerNameInput
            key={player.id}
            index={index}
            value={player.name}
            onChangeText={(text) => setPlayerName(player.id, text)}
            onFocus={() => setFocusedPlayerId(player.id)}
            onBlur={() => setFocusedPlayerId(undefined)}
          />
        ))}
      </ScrollView>

      <SetupProgressDots step={2} total={3} />

      <Button
        label="Suivant"
        disabled={!canProceedToTeamSetup}
        onPress={() => navigation.navigate('TeamSetup')}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  bustRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  list: {
    flex: 1,
    marginTop: spacing.lg,
  },
});
