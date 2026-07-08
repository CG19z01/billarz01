import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/common';
import type { GameEngine } from '../../gameEngines';
import type { MatchAction } from '../../models';
import { colors, spacing } from '../../theme';
import type { ScoreEntry } from '../../utils/matchSelectors';
import { ActionHistoryItem } from './ActionHistoryItem';

interface ActionHistoryListProps {
  actions: MatchAction[];
  entries: ScoreEntry[];
  engine: GameEngine;
  onEditAction: (actionId: string) => void;
  onDeleteAction: (actionId: string) => void;
}

export function ActionHistoryList({
  actions,
  entries,
  engine,
  onEditAction,
  onDeleteAction,
}: ActionHistoryListProps) {
  if (actions.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText variant="body" color={colors.text.muted}>
          Aucun coup enregistré pour l&apos;instant.
        </AppText>
      </View>
    );
  }

  return (
    <>
      {actions.map((action) => (
        <ActionHistoryItem
          key={action.id}
          action={action}
          label={engine.describeAction(action, entries)}
          editable={engine.isActionEditable(action)}
          onEdit={() => onEditAction(action.id)}
          onDelete={() => onDeleteAction(action.id)}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  empty: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
});
