import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { ScrollView, StyleSheet } from 'react-native';

import { AppText, ScreenContainer } from '../../components/common';
import { HistoryScoreRow } from '../../components/history';
import { useGameHistoryEntry } from '../../hooks/useGameHistoryEntry';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';
import { getHistoryScoreEntries, resolveGameTypeName } from '../../utils/gameHistoryLabels';

type Props = NativeStackScreenProps<RootStackParamList, 'GameDetail'>;

export function GameDetailScreen({ route }: Props) {
  const entry = useGameHistoryEntry(route.params.matchId);

  if (!entry) {
    return (
      <ScreenContainer>
        <AppText variant="body" color={colors.text.secondary}>
          Partie introuvable — elle a peut-être expiré.
        </AppText>
      </ScreenContainer>
    );
  }

  const scoreEntries = getHistoryScoreEntries(entry);

  return (
    <ScreenContainer>
      <AppText variant="label" color={colors.accent.default}>
        {resolveGameTypeName(entry.gameTypeId)}
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        {format(entry.playedAt, "dd/MM/yyyy 'à' HH:mm")}
      </AppText>

      <ScrollView showsVerticalScrollIndicator={false}>
        {scoreEntries.map((scoreEntry) => (
          <HistoryScoreRow
            key={scoreEntry.id}
            entry={scoreEntry}
            score={entry.finalScore[scoreEntry.id] ?? 0}
            isWinner={(entry.winnerIds ?? []).includes(scoreEntry.id)}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});
