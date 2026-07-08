import { StyleSheet, View } from 'react-native';

import { AnimatedPressable, AppText } from '../../components/common';
import { CUSHION_OPTIONS, getBallValue } from '../../gameEngines';
import { colors, radius, spacing } from '../../theme';

interface CushionPickerProps {
  onSelect: (cushions: number) => void;
}

export function CushionPicker({ onSelect }: CushionPickerProps) {
  return (
    <View style={styles.list}>
      {CUSHION_OPTIONS.map((cushions) => (
        <AnimatedPressable key={cushions} onPress={() => onSelect(cushions)} style={styles.option}>
          <AppText variant="bodyMedium">
            {cushions} bande{cushions > 1 ? 's' : ''} — {getBallValue(8, cushions)} points
          </AppText>
        </AnimatedPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
