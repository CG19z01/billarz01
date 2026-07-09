import { StyleSheet, View } from 'react-native';

import { AnimatedPressable, AppText } from '../../components/common';
import { MAX_PLAYERS, MIN_PLAYERS } from '../../constants/players';
import { colors, radius, spacing } from '../../theme';

interface PlayerCountSelectorProps {
  value: number;
  onChange: (count: number) => void;
}

const AVAILABLE_COUNTS = Array.from(
  { length: MAX_PLAYERS - MIN_PLAYERS + 1 },
  (_, index) => MIN_PLAYERS + index,
);

export function PlayerCountSelector({ value, onChange }: PlayerCountSelectorProps) {
  return (
    <View style={styles.row}>
      {AVAILABLE_COUNTS.map((count) => {
        const selected = count === value;
        return (
          <AnimatedPressable
            key={count}
            onPress={() => onChange(count)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <AppText
              variant="heading2"
              color={selected ? colors.text.onAccent : colors.text.primary}
            >
              {count}
            </AppText>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}

const CHIP_SIZE = 60;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  chip: {
    width: CHIP_SIZE,
    height: CHIP_SIZE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  chipSelected: {
    backgroundColor: colors.accent.default,
    borderColor: colors.accent.default,
  },
});
