import { StyleSheet, View } from 'react-native';

import { AnimatedPressable, AppText } from '../../components/common';
import { BLACK_BALL_SHOT_OPTIONS, type BlackBallShotType } from '../../constants/blackBall';
import { colors, radius, spacing } from '../../theme';

interface BlackBallShotPickerProps {
  value?: BlackBallShotType;
  onSelect: (shotType: BlackBallShotType) => void;
}

export function BlackBallShotPicker({ value, onSelect }: BlackBallShotPickerProps) {
  return (
    <View style={styles.list}>
      {BLACK_BALL_SHOT_OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <AnimatedPressable
            key={option.value}
            onPress={() => onSelect(option.value)}
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
