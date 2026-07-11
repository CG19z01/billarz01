import { useSharedValue } from 'react-native-reanimated';

export interface ZoneRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useTeamZonesLayout() {
  const zones = useSharedValue<Record<string, ZoneRect>>({});

  const registerZone = (teamId: string, rect: ZoneRect) => {
    zones.value = { ...zones.value, [teamId]: rect };
  };

  return { zones, registerZone };
}
