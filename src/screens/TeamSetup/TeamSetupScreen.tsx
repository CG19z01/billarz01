import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Button, ScreenContainer } from '../../components/common';
import { TeamCard, TeamModeSelector } from '../../components/teams';
import { useTeamSetup } from '../../hooks/useTeamSetup';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TeamSetup'>;

export function TeamSetupScreen({ navigation }: Props) {
  const { players, teamMode, teams, setTeamMode, randomizeTeams, cyclePlayerTeam } = useTeamSetup();

  return (
    <ScreenContainer>
      <AppText variant="label" color={colors.accent.default}>
        Équipes
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        Comment jouez-vous ?
      </AppText>

      <TeamModeSelector value={teamMode} onChange={setTeamMode} />

      {teamMode !== 'solo' ? (
        <View style={styles.teamsSection}>
          <View style={styles.randomizeRow}>
            <Button label="Tirage aléatoire" variant="secondary" onPress={randomizeTeams} />
          </View>
          <ScrollView style={styles.teamsList} showsVerticalScrollIndicator={false}>
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                players={players}
                onPressPlayer={cyclePlayerTeam}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.teamsSection} />
      )}

      <Button label="Suivant" onPress={() => navigation.navigate('Match')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  teamsSection: {
    flex: 1,
    marginTop: spacing.xl,
  },
  randomizeRow: {
    marginBottom: spacing.md,
  },
  teamsList: {
    flex: 1,
  },
});
