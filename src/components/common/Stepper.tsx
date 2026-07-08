import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';
import { AppText } from './AppText';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
}

export function Stepper({ value, onChange, min = 0, step = 1 }: StepperProps) {
  return (
    <View style={styles.row}>
      <AnimatedPressable
        style={styles.button}
        onPress={() => onChange(Math.max(min, value - step))}
        hitSlop={8}
      >
        <AppText variant="heading2">−</AppText>
      </AnimatedPressable>
      <AppText variant="heading2" style={styles.value}>
        {value}
      </AppText>
      <AnimatedPressable style={styles.button} onPress={() => onChange(value + step)} hitSlop={8}>
        <AppText variant="heading2">+</AppText>
      </AnimatedPressable>
    </View>
  );
}

const BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    minWidth: 48,
    textAlign: 'center',
  },
});
