import { StyleSheet } from 'react-native';

import { AnimatedPressable, AppText } from '../../components/common';
import type { GameType } from '../../models';
import { colors, radius, spacing } from '../../theme';

interface GameTypeCardProps {
  gameType: GameType;
  selected: boolean;
  onPress: () => void;
}

export function GameTypeCard({ gameType, selected, onPress }: GameTypeCardProps) {
  const textColor = selected ? colors.text.onAccent : colors.text.primary;

  return (
    <AnimatedPressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
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
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
  description: {
    marginTop: spacing.xs,
  },
});
