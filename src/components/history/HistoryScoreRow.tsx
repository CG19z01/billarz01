import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/common';
import { colors, radius, spacing } from '../../theme';
import type { ScoreEntry } from '../../utils/matchSelectors';

interface HistoryScoreRowProps {
  entry: ScoreEntry;
  score: number;
  isWinner: boolean;
}

export function HistoryScoreRow({ entry, score, isWinner }: HistoryScoreRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.identity}>
        {entry.color ? <View style={[styles.dot, { backgroundColor: entry.color }]} /> : null}
        <AppText variant="subtitle">{entry.name}</AppText>
        {isWinner ? (
          <AppText variant="label" color={colors.accent.default} style={styles.badge}>
            Vainqueur
          </AppText>
        ) : null}
      </View>
      <AppText variant="heading2">{score}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  badge: {
    marginLeft: spacing.md,
  },
});
