import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

import { AnimatedPressable } from '../../components/common';
import { colors } from '../../theme';
import { BilliardBallGraphic } from './BilliardBallGraphic';

interface BilliardBallProps {
  number: number;
  size?: number;
  selected?: boolean;
  onPress?: () => void;
}

const DEFAULT_SIZE = 48;
const SELECTED_RING_WIDTH = 2;
const SELECTED_RING_PADDING = 2;

export function BilliardBall({
  number,
  size = DEFAULT_SIZE,
  selected = false,
  onPress,
}: BilliardBallProps) {
  const graphic = <BilliardBallGraphic number={number} size={size} />;
  const ringStyle: ViewStyle | undefined = selected
    ? {
        borderWidth: SELECTED_RING_WIDTH,
        borderColor: colors.accent.default,
        borderRadius: size / 2 + SELECTED_RING_PADDING,
        padding: SELECTED_RING_PADDING,
      }
    : undefined;

  if (!onPress) {
    return <View style={ringStyle}>{graphic}</View>;
  }

  return (
    <AnimatedPressable onPress={onPress} hitSlop={8} style={ringStyle}>
      {graphic}
    </AnimatedPressable>
  );
}
