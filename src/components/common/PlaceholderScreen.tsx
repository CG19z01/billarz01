import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from './AppText';
import { ScreenContainer } from './ScreenContainer';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
}

export function PlaceholderScreen({ title, subtitle }: PlaceholderScreenProps) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AppText variant="heading1">{title}</AppText>
        {subtitle ? (
          <AppText variant="body" color={colors.text.secondary} style={styles.subtitle}>
            {subtitle}
          </AppText>
        ) : null}
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
  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
