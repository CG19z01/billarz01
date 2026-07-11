import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppText, ScreenContainer } from '../../components/common';
import { useHistoryCleanup } from '../../hooks/useHistoryCleanup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const REDIRECT_DELAY_MS = 1200;

export function SplashScreen({ navigation }: Props) {
  useHistoryCleanup();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Home'), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer background="felt">
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo-billarz01.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <AppText variant="display" style={styles.title}>
          billarz01
        </AppText>
        <View style={styles.divider} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 88,
    height: 88,
  },
  title: {
    marginTop: spacing.sm,
  },
  divider: {
    marginTop: spacing.xl,
    width: 48,
    height: 2,
    backgroundColor: colors.accent.default,
  },
});
