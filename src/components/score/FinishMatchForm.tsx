import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable, AppText, Button } from '../../components/common';
import { colors, radius, spacing } from '../../theme';
import type { ScoreEntry } from '../../utils/matchSelectors';

interface FinishMatchFormProps {
  entries: ScoreEntry[];
  onConfirm: (winnerId: string | undefined) => void;
  onCancel: () => void;
}

export function FinishMatchForm({ entries, onConfirm, onCancel }: FinishMatchFormProps) {
  const [winnerId, setWinnerId] = useState<string | undefined>(undefined);

  return (
    <View>
      <AppText variant="body" color={colors.text.secondary} style={styles.hint}>
        Qui a gagné ? (facultatif)
      </AppText>

      <View style={styles.list}>
        {entries.map((entry) => {
          const selected = entry.id === winnerId;
          return (
            <AnimatedPressable
              key={entry.id}
              onPress={() => setWinnerId(selected ? undefined : entry.id)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <AppText
                variant="bodyMedium"
                color={selected ? colors.text.onAccent : colors.text.primary}
              >
                {entry.name}
              </AppText>
            </AnimatedPressable>
          );
        })}
      </View>

      <View style={styles.buttons}>
        <Button label="Annuler" variant="ghost" onPress={onCancel} />
        <Button label="Confirmer" variant="primary" onPress={() => onConfirm(winnerId)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  optionSelected: {
    backgroundColor: colors.accent.default,
    borderColor: colors.accent.default,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
