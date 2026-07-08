import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, ScreenContainer } from '../../components/common';
import { HistoryListItem } from '../../components/history';
import { useGameHistory } from '../../hooks/useGameHistory';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export function HistoryScreen({ navigation }: Props) {
  const { entries } = useGameHistory();

  return (
    <ScreenContainer>
      <AppText variant="label" color={colors.accent.default}>
        Historique
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        Parties des 3 dernières heures
      </AppText>

      {entries.length === 0 ? (
        <View style={styles.empty}>
          <AppText variant="body" color={colors.text.muted}>
            Aucune partie récente.
          </AppText>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {entries.map((entry) => (
            <HistoryListItem
              key={entry.id}
              entry={entry}
              onPress={() => navigation.navigate('GameDetail', { matchId: entry.id })}
            />
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
