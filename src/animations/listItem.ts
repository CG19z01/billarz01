import { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const DURATION_MS = 180;

export const listItemEntering = FadeInDown.duration(DURATION_MS);
export const listItemExiting = FadeOutUp.duration(DURATION_MS);
