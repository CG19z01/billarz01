import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { CharacterBust, type CharacterVariant } from '../../components/characters';
import type { ZoneRect } from '../../hooks/useTeamZonesLayout';

interface DraggableCharacterProps {
  playerId: string;
  name: string;
  variant: CharacterVariant;
  currentTeamId: string;
  zones: SharedValue<Record<string, ZoneRect>>;
  onDrop: (playerId: string, teamId: string) => void;
  onTap: (playerId: string) => void;
}

const TAP_THRESHOLD = 8;

function findZoneAt(zones: Record<string, ZoneRect>, x: number, y: number): string | undefined {
  'worklet';
  for (const teamId in zones) {
    const rect = zones[teamId];
    if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
      return teamId;
    }
  }
  return undefined;
}

export function DraggableCharacter({
  playerId,
  name,
  variant,
  currentTeamId,
  zones,
  onDrop,
  onTap,
}: DraggableCharacterProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const pan = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const distance = Math.hypot(event.translationX, event.translationY);
      if (distance < TAP_THRESHOLD) {
        runOnJS(onTap)(playerId);
        return;
      }
      const targetTeamId = findZoneAt(zones.value, event.absoluteX, event.absoluteY);
      if (targetTeamId && targetTeamId !== currentTeamId) {
        runOnJS(onDrop)(playerId, targetTeamId);
      }
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      isDragging.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    zIndex: isDragging.value ? 10 : 0,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle}>
        <CharacterBust name={name} variant={variant} />
      </Animated.View>
    </GestureDetector>
  );
}
