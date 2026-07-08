import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const PRESSED_SCALE = 0.96;
const SPRING_CONFIG = { damping: 18, stiffness: 260 };

export function usePressableScale() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    // Mutating `.value` is Reanimated's documented API for shared values,
    // not a React state mutation — the compiler lint rule can't tell the difference.
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(PRESSED_SCALE, SPRING_CONFIG);
  };

  const onPressOut = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, SPRING_CONFIG);
  };

  return { animatedStyle, onPressIn, onPressOut };
}
