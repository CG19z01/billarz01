import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';

interface SetupProgressDotsProps {
  step: number;
  total: number;
}

const DOT_SIZE = 6;

export function SetupProgressDots({ step, total }: SetupProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          style={[styles.dot, index === step - 1 ? styles.dotActive : null]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.border.default,
  },
  dotActive: {
    backgroundColor: colors.accent.default,
    width: DOT_SIZE * 2.5,
  },
});
