import { useNewGameSetupStore } from '../store';

export function useGameSelection() {
  const gameTypeId = useNewGameSetupStore((state) => state.gameTypeId);
  const setGameTypeId = useNewGameSetupStore((state) => state.setGameTypeId);

  return {
    gameTypeId,
    setGameTypeId,
    canProceedToMatch: gameTypeId !== undefined,
  };
}
