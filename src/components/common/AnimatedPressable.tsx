import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { usePressableScale } from '../../animations/pressableScale';

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export function AnimatedPressable({
  style,
  children,
  onPressIn,
  onPressOut,
  ...rest
}: AnimatedPressableProps) {
  const { animatedStyle, onPressIn: animateIn, onPressOut: animateOut } = usePressableScale();

  return (
    <ReanimatedPressable
      style={[style, animatedStyle]}
      onPressIn={(event) => {
        animateIn();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateOut();
        onPressOut?.(event);
      }}
      {...rest}
    >
      {children}
    </ReanimatedPressable>
  );
}
