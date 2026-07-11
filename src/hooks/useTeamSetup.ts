import { useNewGameSetupStore } from '../store';

export function useTeamSetup() {
  const players = useNewGameSetupStore((state) => state.players);
  const teamMode = useNewGameSetupStore((state) => state.teamMode);
  const teams = useNewGameSetupStore((state) => state.teams);
  const setTeamMode = useNewGameSetupStore((state) => state.setTeamMode);
  const randomizeTeams = useNewGameSetupStore((state) => state.randomizeTeams);
  const cyclePlayerTeam = useNewGameSetupStore((state) => state.cyclePlayerTeam);
  const assignPlayerToTeam = useNewGameSetupStore((state) => state.assignPlayerToTeam);

  return {
    players,
    teamMode,
    teams,
    setTeamMode,
    randomizeTeams,
    cyclePlayerTeam,
    assignPlayerToTeam,
  };
}
