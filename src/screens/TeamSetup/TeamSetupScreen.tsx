import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { CharacterBust } from '../../components/characters';
import {
  AppText,
  BackButton,
  Button,
  ScreenContainer,
  SetupProgressDots,
} from '../../components/common';
import { DraggableCharacter, TeamModeSelector, TeamZone } from '../../components/teams';
import { useTeamSetup } from '../../hooks/useTeamSetup';
import { useTeamZonesLayout } from '../../hooks/useTeamZonesLayout';
import type { RootStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TeamSetup'>;

export function TeamSetupScreen({ navigation }: Props) {
  const {
    players,
    teamMode,
    teams,
    setTeamMode,
    randomizeTeams,
    cyclePlayerTeam,
    assignPlayerToTeam,
  } = useTeamSetup();
  const { zones, registerZone } = useTeamZonesLayout();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

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
          <AppText variant="caption" color={colors.text.muted} style={styles.hint}>
            Glissez un joueur pour changer d&apos;équipe
          </AppText>
          <View style={styles.grid}>
            {teams.map((team, teamIndex) => (
              <TeamZone
                key={team.id}
                teamId={team.id}
                name={team.name}
                color={team.color}
                onLayoutRect={registerZone}
              >
                {team.playerIds.map((playerId) => {
                  const player = players.find((candidate) => candidate.id === playerId);
                  if (!player) {
                    return null;
                  }
                  return (
                    <DraggableCharacter
                      key={player.id}
                      playerId={player.id}
                      name={player.name}
                      variant={teamIndex}
                      currentTeamId={team.id}
                      zones={zones}
                      onDrop={assignPlayerToTeam}
                      onTap={cyclePlayerTeam}
                    />
                  );
                })}
              </TeamZone>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.soloSection}>
          {players.map((player) => (
            <CharacterBust key={player.id} name={player.name} variant="default" />
          ))}
        </View>
      )}

      <SetupProgressDots step={3} total={3} />

      <Button label="Suivant" onPress={() => navigation.navigate('Match')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
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
  hint: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    alignContent: 'flex-start',
  },
  soloSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
});
