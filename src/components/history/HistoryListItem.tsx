import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { listItemEntering } from '../../animations';
import { AnimatedPressable, AppText } from '../../components/common';
import type { GameHistoryEntry } from '../../models';
import { colors, radius, spacing } from '../../theme';
import {
  getHistoryScoreEntries,
  resolveGameTypeName,
  resolveWinnerNames,
} from '../../utils/gameHistoryLabels';

interface HistoryListItemProps {
  entry: GameHistoryEntry;
  onPress: () => void;
}

export function HistoryListItem({ entry, onPress }: HistoryListItemProps) {
  const gameName = resolveGameTypeName(entry.gameTypeId);
  const winnerNames = resolveWinnerNames(entry);
  const participantNames = getHistoryScoreEntries(entry)
    .map((scoreEntry) => scoreEntry.name)
    .join(' vs ');

  return (
    <Animated.View entering={listItemEntering}>
      <AnimatedPressable onPress={onPress} style={styles.card}>
        <View style={styles.header}>
          <AppText variant="subtitle">{gameName}</AppText>
          <AppText variant="caption" color={colors.text.muted}>
            {format(entry.playedAt, "dd/MM 'à' HH:mm")}
          </AppText>
        </View>

        <AppText variant="body" color={colors.text.secondary} numberOfLines={1}>
          {participantNames}
        </AppText>

        {winnerNames.length > 0 ? (
          <AppText variant="label" color={colors.accent.default} style={styles.winner}>
            {winnerNames.length > 1 ? 'Ex-æquo : ' : 'Vainqueur : '}
            {winnerNames.join(', ')}
          </AppText>
        ) : null}
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  winner: {
    marginTop: spacing.sm,
  },
});
