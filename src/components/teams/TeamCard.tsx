import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { listItemEntering, listItemExiting } from '../../animations';
import { AnimatedPressable, AppText } from '../../components/common';
import type { Player, Team } from '../../models';
import { colors, radius, spacing } from '../../theme';

interface TeamCardProps {
  team: Team;
  players: Player[];
  onPressPlayer: (playerId: string) => void;
}

export function TeamCard({ team, players, onPressPlayer }: TeamCardProps) {
  const teamPlayers = team.playerIds
    .map((playerId) => players.find((player) => player.id === playerId))
    .filter((player): player is Player => player !== undefined);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.colorDot, { backgroundColor: team.color }]} />
        <AppText variant="subtitle">{team.name}</AppText>
      </View>

      <View style={styles.chips}>
        {teamPlayers.map((player) => (
          <Animated.View key={player.id} entering={listItemEntering} exiting={listItemExiting}>
            <AnimatedPressable onPress={() => onPressPlayer(player.id)} style={styles.chip}>
              <AppText variant="body">{player.name}</AppText>
            </AnimatedPressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const DOT_SIZE = 10;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  colorDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
});
