import { StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { AnimatedPressable, AppText } from '../../components/common';
import { colors, radius, spacing } from '../../theme';
import type { ScoreEntry } from '../../utils/matchSelectors';

const BLACK_BALL_NUMBER = 8;

interface ScoreEntryRowProps {
  entry: ScoreEntry;
  score: number;
  onAddPoint: () => void;
  onRemovePoint: () => void;
  onPressBlackBall: () => void;
}

export function ScoreEntryRow({
  entry,
  score,
  onAddPoint,
  onRemovePoint,
  onPressBlackBall,
}: ScoreEntryRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.identity}>
        {entry.color ? <View style={[styles.colorDot, { backgroundColor: entry.color }]} /> : null}
        <AppText variant="subtitle" numberOfLines={1} style={styles.name}>
          {entry.name}
        </AppText>
      </View>

      <AppText variant="display" style={styles.score}>
        {score}
      </AppText>

      <View style={styles.actions}>
        <AnimatedPressable style={styles.pointButton} onPress={onRemovePoint} hitSlop={8}>
          <AppText variant="heading2">−</AppText>
        </AnimatedPressable>
        <AnimatedPressable style={styles.pointButton} onPress={onAddPoint} hitSlop={8}>
          <AppText variant="heading2">+</AppText>
        </AnimatedPressable>
        <BilliardBall number={BLACK_BALL_NUMBER} size={32} onPress={onPressBlackBall} />
      </View>
    </View>
  );
}

const POINT_BUTTON_SIZE = 36;

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  name: {
    flexShrink: 1,
  },
  score: {
    marginVertical: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pointButton: {
    width: POINT_BUTTON_SIZE,
    height: POINT_BUTTON_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
