import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '../../components/common';
import { colors, radius, spacing } from '../../theme';

interface PlayerNameInputProps {
  index: number;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function PlayerNameInput({
  index,
  value,
  onChangeText,
  onFocus,
  onBlur,
}: PlayerNameInputProps) {
  return (
    <View style={styles.row}>
      <View style={styles.badge}>
        <AppText variant="subtitle" color={colors.text.onAccent}>
          {index + 1}
        </AppText>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={`Joueur ${index + 1}`}
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        maxLength={24}
        returnKeyType="next"
      />
    </View>
  );
}

const BADGE_SIZE = 36;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.accent.default,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 16,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
});
