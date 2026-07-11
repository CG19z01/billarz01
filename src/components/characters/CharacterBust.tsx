import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { AppText } from '../common';
import { CharacterGraphic, type CharacterVariant } from './CharacterGraphic';

interface CharacterBustProps {
  name?: string;
  variant: CharacterVariant;
  size?: number;
}

const DEFAULT_SIZE = 56;

export function CharacterBust({ name, variant, size = DEFAULT_SIZE }: CharacterBustProps) {
  const nameColor = variant === 'active' ? colors.accent.default : colors.text.secondary;

  return (
    <View style={styles.container}>
      {name ? (
        <AppText
          variant={variant === 'active' ? 'subtitle' : 'caption'}
          color={nameColor}
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </AppText>
      ) : null}
      <CharacterGraphic variant={variant} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxWidth: 84,
  },
  name: {
    marginBottom: spacing.xs,
  },
});
