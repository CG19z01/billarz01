import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { listItemEntering, listItemExiting } from '../../animations';
import { CharacterBust } from '../../components/characters';
import {
  AppText,
  BackButton,
  Button,
  PoolTableGraphic,
  ScreenContainer,
  SetupProgressDots,
} from '../../components/common';
import { PlayerCountSelector } from '../../components/players';
import { useNewGameSetup } from '../../hooks/useNewGameSetup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const BUST_SIZE = 48;

export function NewGameScreen({ navigation }: Props) {
  const { playerCount, setPlayerCount, players } = useNewGameSetup();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.content}>
        <AppText variant="label" color={colors.accent.default}>
          Nouvelle partie
        </AppText>
        <AppText variant="heading1" style={styles.title}>
          Combien de joueurs ?
        </AppText>

        <PoolTableGraphic height={110}>
          <View style={styles.bustRow}>
            {players.map((player) => (
              <Animated.View key={player.id} entering={listItemEntering} exiting={listItemExiting}>
                <CharacterBust variant="default" size={BUST_SIZE} />
              </Animated.View>
            ))}
          </View>
        </PoolTableGraphic>

        <View style={styles.selectorWrapper}>
          <PlayerCountSelector value={playerCount} onChange={setPlayerCount} />
        </View>

        <SetupProgressDots step={1} total={3} />
      </View>

      <Button label="Suivant" onPress={() => navigation.navigate('PlayerSetup')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
  selectorWrapper: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
