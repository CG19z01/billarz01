import { StyleSheet } from 'react-native';

import { borderWidth, colors, radius } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';
import { AppText } from './AppText';

interface BackButtonProps {
  onPress: () => void;
}

const SIZE = 44;

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <AnimatedPressable onPress={onPress} hitSlop={8} style={styles.button}>
      <AppText variant="heading2" color={colors.accent.default}>
        ‹
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.surface,
    borderWidth: borderWidth.hairline,
    borderColor: colors.border.default,
  },
});
