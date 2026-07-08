import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  AnimatedPressable,
  AppModal,
  AppText,
  Button,
  ScreenContainer,
} from '../../components/common';
import { EditCushionsForm, OrderOfNumbersBoard } from '../../components/game';
import {
  ActionHistoryList,
  BlackBallShotPicker,
  EditActionForm,
  FinishMatchForm,
  ScoreBoard,
} from '../../components/score';
import { QUICK_POINT_STEP } from '../../constants/scoring';
import { ORDER_OF_NUMBERS_GAME_ID, type OrderOfNumbersState } from '../../gameEngines';
import { useMatch } from '../../hooks/useMatch';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Match'>;

export function MatchScreen({ navigation }: Props) {
  const {
    match,
    engine,
    gameState,
    scoreEntries,
    scores,
    currentEntryId,
    result,
    orderedActions,
    recordAction,
    updateAction,
    deleteAction,
    undoLastAction,
    canUndo,
    restartMatch,
    finishMatch,
  } = useMatch();

  const [blackBallEntryId, setBlackBallEntryId] = useState<string | undefined>(undefined);
  const [editingActionId, setEditingActionId] = useState<string | undefined>(undefined);
  const [finishModalVisible, setFinishModalVisible] = useState(false);

  if (!match) {
    return (
      <ScreenContainer>
        <AppText variant="body" color={colors.text.secondary}>
          Aucune partie en cours.
        </AppText>
      </ScreenContainer>
    );
  }

  const isOrderOfNumbers = match.gameTypeId === ORDER_OF_NUMBERS_GAME_ID;
  const editingAction = match.actions.find((action) => action.id === editingActionId);

  function archiveMatch(winnerIds: string[]) {
    finishMatch(winnerIds);
    navigation.navigate('History');
  }

  return (
    <ScreenContainer>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppText variant="label" color={colors.accent.default}>
          Partie en cours
        </AppText>

        <View style={styles.scoreboard}>
          {isOrderOfNumbers ? (
            <OrderOfNumbersBoard
              state={gameState as OrderOfNumbersState}
              scores={scores}
              scoreEntries={scoreEntries}
              currentEntryId={currentEntryId}
              result={result}
              onRecordAction={recordAction}
              onArchive={() => archiveMatch(result.winnerIds)}
            />
          ) : (
            <ScoreBoard
              entries={scoreEntries}
              scores={scores}
              onAddPoint={(entryId) =>
                recordAction(entryId, 'point-added', { points: QUICK_POINT_STEP })
              }
              onRemovePoint={(entryId) =>
                recordAction(entryId, 'point-removed', { points: QUICK_POINT_STEP })
              }
              onPressBlackBall={setBlackBallEntryId}
            />
          )}
        </View>

        <View style={styles.historyHeader}>
          <AppText variant="subtitle">Historique des coups</AppText>
          <AnimatedPressable onPress={undoLastAction} disabled={!canUndo} hitSlop={8}>
            <AppText variant="label" color={canUndo ? colors.accent.default : colors.text.muted}>
              Annuler le dernier coup
            </AppText>
          </AnimatedPressable>
        </View>

        <ActionHistoryList
          actions={orderedActions}
          entries={scoreEntries}
          engine={engine}
          onEditAction={setEditingActionId}
          onDeleteAction={deleteAction}
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Button label="Recommencer" variant="secondary" onPress={restartMatch} />
        </View>
        {!isOrderOfNumbers ? (
          <View style={styles.footerButton}>
            <Button
              label="Terminer la partie"
              variant="primary"
              onPress={() => setFinishModalVisible(true)}
            />
          </View>
        ) : null}
      </View>

      {!isOrderOfNumbers ? (
        <AppModal
          visible={blackBallEntryId !== undefined}
          title="Boule noire"
          onClose={() => setBlackBallEntryId(undefined)}
        >
          <BlackBallShotPicker
            onSelect={(shotType) => {
              if (blackBallEntryId) {
                recordAction(blackBallEntryId, 'black-ball', { blackBallShotType: shotType });
              }
              setBlackBallEntryId(undefined);
            }}
          />
        </AppModal>
      ) : null}

      <AppModal
        visible={editingAction !== undefined}
        title="Modifier le coup"
        onClose={() => setEditingActionId(undefined)}
      >
        {editingAction ? (
          isOrderOfNumbers ? (
            <EditCushionsForm
              onCancel={() => setEditingActionId(undefined)}
              onConfirm={(payload) => {
                updateAction(editingAction.id, { payload });
                setEditingActionId(undefined);
              }}
            />
          ) : (
            <EditActionForm
              action={editingAction}
              onCancel={() => setEditingActionId(undefined)}
              onConfirm={(payload) => {
                updateAction(editingAction.id, { payload });
                setEditingActionId(undefined);
              }}
            />
          )
        ) : null}
      </AppModal>

      {!isOrderOfNumbers ? (
        <AppModal
          visible={finishModalVisible}
          title="Terminer la partie"
          onClose={() => setFinishModalVisible(false)}
        >
          <FinishMatchForm
            entries={scoreEntries}
            onCancel={() => setFinishModalVisible(false)}
            onConfirm={(winnerId) => {
              archiveMatch(winnerId ? [winnerId] : []);
              setFinishModalVisible(false);
            }}
          />
        </AppModal>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scoreboard: {
    marginTop: spacing.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});
