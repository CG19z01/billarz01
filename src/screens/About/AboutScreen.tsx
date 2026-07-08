import { StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { AppText, ScreenContainer } from '../../components/common';
import { useAppInfo } from '../../hooks/useAppInfo';
import { colors, spacing } from '../../theme';

export function AboutScreen() {
  const { name, version } = useAppInfo();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <BilliardBall number={0} size={56} />
        <AppText variant="heading1" style={styles.title}>
          {name}
        </AppText>
        <AppText variant="body" color={colors.text.secondary} style={styles.tagline}>
          Le compteur de score qui a du style.
        </AppText>
        <AppText variant="caption" color={colors.text.muted} style={styles.version}>
          Version {version}
        </AppText>
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
  title: {
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  tagline: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  version: {
    marginTop: spacing.xl,
  },
});
