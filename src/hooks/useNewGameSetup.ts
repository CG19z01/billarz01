import { useNewGameSetupStore } from '../store';
import { areAllPlayersNamed } from '../utils/validation';

export function useNewGameSetup() {
  const playerCount = useNewGameSetupStore((state) => state.playerCount);
  const players = useNewGameSetupStore((state) => state.players);
  const setPlayerCount = useNewGameSetupStore((state) => state.setPlayerCount);
  const setPlayerName = useNewGameSetupStore((state) => state.setPlayerName);

  return {
    playerCount,
    players,
    setPlayerCount,
    setPlayerName,
    canProceedToTeamSetup: areAllPlayersNamed(players),
  };
}
