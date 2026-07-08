import { StyleSheet, View, type ViewProps } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';

type ScreenBackground = 'default' | 'elevated' | 'felt';

interface ScreenContainerProps extends ViewProps {
  background?: ScreenBackground;
  edges?: Edge[];
  padded?: boolean;
}

const backgroundColorByVariant: Record<ScreenBackground, string> = {
  default: colors.background.default,
  elevated: colors.background.elevated,
  felt: colors.background.felt,
};

export function ScreenContainer({
  background = 'default',
  edges = ['top', 'bottom', 'left', 'right'],
  padded = true,
  style,
  children,
  ...rest
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.safeArea, { backgroundColor: backgroundColorByVariant[background] }]}
    >
      <View style={[padded && styles.padded, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  padded: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
});
