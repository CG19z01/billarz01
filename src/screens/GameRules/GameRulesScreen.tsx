import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { AppText, BackButton, Button, ScreenContainer } from '../../components/common';
import { GAME_RULES } from '../../constants/gameRules';
import { GAME_TYPES } from '../../constants/games';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'GameRules'>;

export function GameRulesScreen({ navigation, route }: Props) {
  const { gameTypeId } = route.params;
  const gameType = GAME_TYPES.find((game) => game.id === gameTypeId);
  const rules = GAME_RULES[gameTypeId];

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.headerText}>
          <BilliardBall number={8} size={32} />
          <AppText variant="heading1" style={styles.title}>
            {gameType?.name ?? 'Règles du jeu'}
          </AppText>
        </View>
      </View>

      {rules ? (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <AppText variant="label" color={colors.accent.default}>
            Objectif
          </AppText>
          <AppText variant="body" style={styles.paragraph}>
            {rules.objective}
          </AppText>

          <AppText variant="label" color={colors.accent.default} style={styles.sectionSpacer}>
            Règles principales
          </AppText>
          {rules.mainRules.map((rule, index) => (
            <View key={index} style={styles.bulletRow}>
              <AppText variant="body" color={colors.accent.default}>
                •
              </AppText>
              <AppText variant="body" style={styles.bulletText}>
                {rule}
              </AppText>
            </View>
          ))}

          <AppText variant="label" color={colors.accent.default} style={styles.sectionSpacer}>
            Victoire
          </AppText>
          <AppText variant="body" style={styles.paragraph}>
            {rules.victory}
          </AppText>
        </ScrollView>
      ) : (
        <AppText variant="body" color={colors.text.secondary} style={styles.body}>
          Règles indisponibles pour ce jeu.
        </AppText>
      )}

      <Button label="Fermer" variant="secondary" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  title: {
    flexShrink: 1,
  },
  body: {
    flex: 1,
  },
  paragraph: {
    marginTop: spacing.sm,
  },
  sectionSpacer: {
    marginTop: spacing.xl,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  bulletText: {
    flex: 1,
  },
});
