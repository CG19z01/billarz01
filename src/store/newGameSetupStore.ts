import { create } from 'zustand';

import { MIN_PLAYERS } from '../constants/players';
import type { Player, Team, TeamMode } from '../models';
import { generateTeams } from '../usecases/generateTeams';
import { generateId } from '../utils/idUtils';

const DEFAULT_PLAYER_COUNT = 2;
const DEFAULT_TEAM_MODE: TeamMode = 'solo';

function createDefaultPlayers(count: number): Player[] {
  return Array.from({ length: count }, (_, index) => ({
    id: generateId(),
    name: `Joueur ${index + 1}`,
  }));
}

interface NewGameSetupState {
  playerCount: number;
  players: Player[];
  teamMode: TeamMode;
  teams: Team[];
  gameTypeId: string | undefined;
  setPlayerCount: (count: number) => void;
  setPlayerName: (playerId: string, name: string) => void;
  setTeamMode: (mode: TeamMode) => void;
  randomizeTeams: () => void;
  cyclePlayerTeam: (playerId: string) => void;
  setGameTypeId: (gameTypeId: string) => void;
  reset: () => void;
}

export const useNewGameSetupStore = create<NewGameSetupState>((set, get) => ({
  playerCount: DEFAULT_PLAYER_COUNT,
  players: createDefaultPlayers(DEFAULT_PLAYER_COUNT),
  teamMode: DEFAULT_TEAM_MODE,
  teams: [],
  gameTypeId: undefined,

  setPlayerCount: (count) => {
    const safeCount = Math.max(MIN_PLAYERS, count);
    set({
      playerCount: safeCount,
      players: createDefaultPlayers(safeCount),
      teamMode: DEFAULT_TEAM_MODE,
      teams: [],
    });
  },

  setPlayerName: (playerId, name) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, name } : player,
      ),
    })),

  setTeamMode: (mode) => {
    const { players } = get();
    set({ teamMode: mode, teams: generateTeams(players, mode) });
  },

  randomizeTeams: () => {
    const { players, teamMode } = get();
    set({ teams: generateTeams(players, teamMode, { shuffle: true }) });
  },

  cyclePlayerTeam: (playerId) => {
    const { teams } = get();
    if (teams.length < 2) {
      return;
    }
    const currentIndex = teams.findIndex((team) => team.playerIds.includes(playerId));
    if (currentIndex === -1) {
      return;
    }
    const nextIndex = (currentIndex + 1) % teams.length;

    set({
      teams: teams.map((team, index) => {
        if (index === currentIndex) {
          return { ...team, playerIds: team.playerIds.filter((id) => id !== playerId) };
        }
        if (index === nextIndex) {
          return { ...team, playerIds: [...team.playerIds, playerId] };
        }
        return team;
      }),
    });
  },

  setGameTypeId: (gameTypeId) => set({ gameTypeId }),

  reset: () =>
    set({
      playerCount: DEFAULT_PLAYER_COUNT,
      players: createDefaultPlayers(DEFAULT_PLAYER_COUNT),
      teamMode: DEFAULT_TEAM_MODE,
      teams: [],
      gameTypeId: undefined,
    }),
}));
