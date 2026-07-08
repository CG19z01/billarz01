import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { listItemEntering, listItemExiting } from '../../animations';
import { AnimatedPressable, AppText } from '../../components/common';
import type { MatchAction } from '../../models';
import { colors, radius, spacing } from '../../theme';

interface ActionHistoryItemProps {
  action: MatchAction;
  label: string;
  editable: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionHistoryItem({
  action,
  label,
  editable,
  onEdit,
  onDelete,
}: ActionHistoryItemProps) {
  return (
    <Animated.View entering={listItemEntering} exiting={listItemExiting} style={styles.row}>
      <View style={styles.text}>
        <AppText variant="bodyMedium">{label}</AppText>
        <AppText variant="caption" color={colors.text.muted}>
          {format(action.timestamp, 'HH:mm')}
        </AppText>
      </View>
      <View style={styles.buttons}>
        {editable ? (
          <AnimatedPressable onPress={onEdit} hitSlop={8} style={styles.iconButton}>
            <AppText variant="label" color={colors.accent.default}>
              Modifier
            </AppText>
          </AnimatedPressable>
        ) : null}
        <AnimatedPressable onPress={onDelete} hitSlop={8} style={styles.iconButton}>
          <AppText variant="label" color={colors.feedback.danger}>
            Supprimer
          </AppText>
        </AnimatedPressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.surface,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },
  text: {
    flexShrink: 1,
    marginRight: spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconButton: {
    paddingVertical: spacing.xs,
  },
});
