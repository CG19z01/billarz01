import { StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { AnimatedPressable, AppText } from '../../components/common';
import type { GameType } from '../../models';
import { colors, radius, spacing } from '../../theme';

interface GameTypeCardProps {
  gameType: GameType;
  selected: boolean;
  onPress: () => void;
  onPressRules: () => void;
}

export function GameTypeCard({ gameType, selected, onPress, onPressRules }: GameTypeCardProps) {
  const textColor = selected ? colors.text.onAccent : colors.text.primary;

  return (
    <AnimatedPressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <BilliardBall number={8} size={36} />

      <View style={styles.textColumn}>
        <AppText variant="subtitle" color={textColor}>
          {gameType.name}
        </AppText>
        {gameType.description ? (
          <AppText
            variant="caption"
            color={selected ? colors.text.onAccent : colors.text.secondary}
            style={styles.description}
          >
            {gameType.description}
          </AppText>
        ) : null}
      </View>

      <AnimatedPressable onPress={onPressRules} hitSlop={8} style={styles.rulesButton}>
        <AppText variant="heading2" color={selected ? colors.text.onAccent : colors.accent.default}>
          ›
        </AppText>
      </AnimatedPressable>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardSelected: {
    backgroundColor: colors.accent.default,
    borderColor: colors.accent.default,
  },
  textColumn: {
    flex: 1,
  },
  description: {
    marginTop: spacing.xs,
  },
  rulesButton: {
    padding: spacing.xs,
  },
});
