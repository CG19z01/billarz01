import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, BackButton, Button, ScreenContainer } from '../../components/common';
import { GameTypeCard } from '../../components/game';
import { GAME_TYPES } from '../../constants/games';
import { useGameSelection } from '../../hooks/useGameSelection';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSelection'>;

export function GameSelectionScreen({ navigation }: Props) {
  const { gameTypeId, setGameTypeId, canProceedToNewGame } = useGameSelection();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <AppText variant="label" color={colors.accent.default}>
        Choix du jeu
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        À quoi jouez-vous ?
      </AppText>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {GAME_TYPES.map((gameType) => (
          <GameTypeCard
            key={gameType.id}
            gameType={gameType}
            selected={gameType.id === gameTypeId}
            onPress={() => setGameTypeId(gameType.id)}
            onPressRules={() => navigation.navigate('GameRules', { gameTypeId: gameType.id })}
          />
        ))}
      </ScrollView>

      <Button
        label="Suivant"
        disabled={!canProceedToNewGame}
        onPress={() => navigation.navigate('NewGame')}
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
  list: {
    flex: 1,
  },
});
