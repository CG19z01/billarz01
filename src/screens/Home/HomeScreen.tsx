import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { BilliardBall } from '../../components/balls';
import {
  AnimatedPressable,
  AppText,
  Button,
  PoolTableGraphic,
  ScreenContainer,
} from '../../components/common';
import type { RootStackParamList } from '../../navigation/types';
import { matchRepository } from '../../repositories';
import { useMatchStore, useNewGameSetupStore } from '../../store';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface TableBall {
  number: number;
  left: number;
  top: number;
  size: number;
  drift?: { x: number; y: number; durationMs: number };
}

const TABLE_BALLS: TableBall[] = [
  { number: 9, left: 22, top: 30, size: 30 },
  { number: 4, left: 34, top: 22, size: 28, drift: { x: 6, y: 3, durationMs: 2400 } },
  { number: 14, left: 46, top: 34, size: 28 },
  { number: 11, left: 60, top: 24, size: 26, drift: { x: -5, y: 4, durationMs: 2800 } },
  { number: 8, left: 66, top: 42, size: 30 },
  { number: 1, left: 30, top: 48, size: 26, drift: { x: 4, y: -5, durationMs: 2200 } },
  { number: 0, left: 78, top: 58, size: 26 },
];

function DriftingBall({ ball }: { ball: TableBall }) {
  const offset = useSharedValue(0);
  const drift = ball.drift;

  useEffect(() => {
    if (!drift) {
      return;
    }
    offset.value = withRepeat(
      withSequence(
        withTiming(1, { duration: drift.durationMs }),
        withTiming(0, { duration: drift.durationMs }),
      ),
      -1,
      true,
    );
  }, [drift, offset]);

  const animatedStyle = useAnimatedStyle(() => {
    if (!ball.drift) {
      return {};
    }
    return {
      transform: [
        { translateX: offset.value * ball.drift.x },
        { translateY: offset.value * ball.drift.y },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.ball,
        { left: `${ball.left}%`, top: `${ball.top}%` },
        ball.drift ? animatedStyle : undefined,
      ]}
    >
      <BilliardBall number={ball.number} size={ball.size} />
    </Animated.View>
  );
}

export function HomeScreen({ navigation }: Props) {
  const handleStartNewGame = () => {
    useNewGameSetupStore.getState().reset();
    matchRepository.clearActiveMatch();
    useMatchStore.getState().clearMatch();
    navigation.navigate('GameSelection');
  };

  return (
    <ScreenContainer background="felt">
      <View style={styles.topBar}>
        <AnimatedPressable onPress={() => navigation.navigate('About')} hitSlop={8}>
          <AppText variant="label" color={colors.text.muted}>
            À propos
          </AppText>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => navigation.navigate('Settings')} hitSlop={8}>
          <AppText variant="label" color={colors.text.muted}>
            Paramètres
          </AppText>
        </AnimatedPressable>
      </View>

      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo-billarz01.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText variant="display" style={styles.title}>
          billarz01
        </AppText>

        <PoolTableGraphic height={220}>
          {TABLE_BALLS.map((ball) => (
            <DriftingBall key={ball.number} ball={ball} />
          ))}
        </PoolTableGraphic>
      </View>

      <View style={styles.actions}>
        <Button label="Nouvelle partie" variant="primary" onPress={handleStartNewGame} />
        <View style={styles.actionSpacer} />
        <Button
          label="Historique"
          variant="secondary"
          onPress={() => navigation.navigate('History')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.lg,
    paddingTop: spacing.sm,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 72,
  },
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  ball: {
    position: 'absolute',
  },
  actions: {
    paddingBottom: spacing.xxl,
  },
  actionSpacer: {
    height: spacing.md,
  },
});
