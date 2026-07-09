import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppModal, AppText, Button } from '../../components/common';
import { BLACK_BALL_NUMBER, type GameResult, type OrderOfNumbersState } from '../../gameEngines';
import { colors, spacing } from '../../theme';
import type { ScoreEntry } from '../../utils/matchSelectors';
import { BallRack } from './BallRack';
import { CushionPicker } from './CushionPicker';

interface OrderOfNumbersBoardProps {
  state: OrderOfNumbersState;
  scores: Record<string, number>;
  scoreEntries: ScoreEntry[];
  currentEntryId: string | undefined;
  result: GameResult;
  onRecordAction: (
    entryId: string | undefined,
    type: string,
    payload?: Record<string, unknown>,
  ) => void;
  onArchive: () => void;
}

function entryName(entryId: string, entries: ScoreEntry[]): string {
  return entries.find((entry) => entry.id === entryId)?.name ?? '—';
}

export function OrderOfNumbersBoard({
  state,
  scores,
  scoreEntries,
  currentEntryId,
  result,
  onRecordAction,
  onArchive,
}: OrderOfNumbersBoardProps) {
  const [pendingBlackBall, setPendingBlackBall] = useState(false);

  function handlePressBall(ballNumber: number) {
    if (!currentEntryId) {
      return;
    }
    if (ballNumber === BLACK_BALL_NUMBER) {
      setPendingBlackBall(true);
      return;
    }
    onRecordAction(currentEntryId, 'ball-pocketed', { ballNumber });
  }

  function handleLongPressBall(ballNumber: number) {
    if (!currentEntryId || ballNumber === BLACK_BALL_NUMBER) {
      return;
    }
    onRecordAction(undefined, 'ball-out-of-play', { ballNumber });
  }

  function handleSelectCushions(cushions: number) {
    if (currentEntryId) {
      onRecordAction(currentEntryId, 'ball-pocketed', { ballNumber: BLACK_BALL_NUMBER, cushions });
    }
    setPendingBlackBall(false);
  }

  return (
    <View>
      <View style={styles.scores}>
        {scoreEntries.map((entry) => (
          <View key={entry.id} style={styles.scoreRow}>
            <AppText
              variant="bodyMedium"
              color={entry.id === currentEntryId ? colors.accent.default : colors.text.primary}
            >
              {entry.name}
              {entry.id === currentEntryId ? ' (au tour)' : ''}
            </AppText>
            <AppText variant="subtitle">{scores[entry.id] ?? 0}</AppText>
          </View>
        ))}
      </View>

      {result.isOver ? (
        <View style={styles.resultSection}>
          <AppText variant="heading2">Partie terminée</AppText>
          {result.winnerIds.length > 0 ? (
            <AppText variant="subtitle" color={colors.accent.default} style={styles.resultLine}>
              {result.winnerIds.length > 1 ? 'Ex-æquo : ' : 'Vainqueur : '}
              {result.winnerIds.map((id) => entryName(id, scoreEntries)).join(', ')}
            </AppText>
          ) : null}
          {result.loserIds.length > 0 ? (
            <AppText variant="body" color={colors.text.secondary} style={styles.resultLine}>
              Éliminé : {result.loserIds.map((id) => entryName(id, scoreEntries)).join(', ')}
            </AppText>
          ) : null}
          <View style={styles.archiveButton}>
            <Button label="Archiver la partie" variant="primary" onPress={onArchive} />
          </View>
        </View>
      ) : null}

      <View style={styles.subsection}>
        <AppText variant="subtitle">Boules restantes</AppText>
        <AppText variant="caption" color={colors.text.muted} style={styles.hint}>
          Appui long pour retirer une boule hors-jeu (rentrée par erreur, aucun point).
        </AppText>
        <View style={styles.subsectionContent}>
          <BallRack
            ballNumbers={state.remainingBalls}
            onPressBall={result.isOver ? undefined : handlePressBall}
            onLongPressBall={result.isOver ? undefined : handleLongPressBall}
          />
        </View>
      </View>

      <View style={styles.subsection}>
        <AppText variant="subtitle">Boules éliminées</AppText>
        <View style={styles.subsectionContent}>
          {state.pocketedOrder.length === 0 ? (
            <AppText variant="caption" color={colors.text.muted}>
              Aucune boule empochée pour l&apos;instant.
            </AppText>
          ) : (
            <BallRack
              ballNumbers={state.pocketedOrder.map((pocketed) => pocketed.ballNumber)}
              size={28}
            />
          )}
        </View>
      </View>

      {!result.isOver ? (
        <Button
          label="Fin du tour"
          variant="secondary"
          onPress={() => currentEntryId && onRecordAction(currentEntryId, 'turn-passed')}
        />
      ) : null}

      <AppModal
        visible={pendingBlackBall}
        title="Boule noire — nombre de bandes"
        onClose={() => setPendingBlackBall(false)}
      >
        <CushionPicker onSelect={handleSelectCushions} />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  scores: {
    marginBottom: spacing.xl,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subsection: {
    marginBottom: spacing.xl,
  },
  subsectionContent: {
    marginTop: spacing.md,
  },
  hint: {
    marginTop: spacing.xs,
  },
  resultSection: {
    marginBottom: spacing.xl,
  },
  resultLine: {
    marginTop: spacing.sm,
  },
  archiveButton: {
    marginTop: spacing.lg,
  },
});
