import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { AnimatedPressable, AppText, Button, ScreenContainer } from '../../components/common';
import type { RootStackParamList } from '../../navigation/types';
import { matchRepository } from '../../repositories';
import { useMatchStore, useNewGameSetupStore } from '../../store';
import { colors, spacing } from '../../theme';

const DECORATIVE_BALL_NUMBERS = [8, 9, 4];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const handleStartNewGame = () => {
    useNewGameSetupStore.getState().reset();
    matchRepository.clearActiveMatch();
    useMatchStore.getState().clearMatch();
    navigation.navigate('GameSelection');
  };

  return (
    <ScreenContainer background="felt">
      <View style={styles.topBar}>
        <AnimatedPressable onPress={() => navigation.navigate('About')} hitSlop={8}>
          <AppText variant="label" color={colors.text.muted}>
            À propos
          </AppText>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => navigation.navigate('Settings')} hitSlop={8}>
          <AppText variant="label" color={colors.text.muted}>
            Paramètres
          </AppText>
        </AnimatedPressable>
      </View>

      <View style={styles.header}>
        <AppText variant="label" color={colors.accent.default}>
          Salle de billard
        </AppText>
        <AppText variant="display" style={styles.title}>
          Billard Score
        </AppText>
        <AppText variant="body" color={colors.text.secondary} style={styles.subtitle}>
          Le compteur de score qui a du style.
        </AppText>
        <View style={styles.decorativeBalls}>
          {DECORATIVE_BALL_NUMBERS.map((number) => (
            <BilliardBall key={number} number={number} size={40} />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button label="Nouvelle partie" variant="primary" onPress={handleStartNewGame} />
        <View style={styles.actionSpacer} />
        <Button
          label="Historique"
          variant="secondary"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.lg,
    paddingTop: spacing.sm,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  decorativeBalls: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  actions: {
    paddingBottom: spacing.xxl,
  },
  actionSpacer: {
    height: spacing.md,
  },
});
