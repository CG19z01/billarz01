import { StyleSheet, View } from 'react-native';

import { AnimatedPressable, AppText } from '../../components/common';
import { TEAM_MODE_OPTIONS } from '../../constants/teams';
import type { TeamMode } from '../../models';
import { colors, radius, spacing } from '../../theme';

interface TeamModeSelectorProps {
  value: TeamMode;
  onChange: (mode: TeamMode) => void;
}

export function TeamModeSelector({ value, onChange }: TeamModeSelectorProps) {
  return (
    <View style={styles.list}>
      {TEAM_MODE_OPTIONS.map((option) => {
        const selected = option.mode === value;
        return (
          <AnimatedPressable
            key={option.mode}
            onPress={() => onChange(option.mode)}
            style={[styles.option, selected && styles.optionSelected]}
          >
            <AppText
              variant="bodyMedium"
              color={selected ? colors.text.onAccent : colors.text.primary}
            >
              {option.label}
            </AppText>
          </AnimatedPressable>
        );
      })}
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
  optionSelected: {
    backgroundColor: colors.accent.default,
    borderColor: colors.accent.default,
  },
});
