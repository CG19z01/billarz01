import { useNewGameSetupStore } from './newGameSetupStore';

beforeEach(() => {
  useNewGameSetupStore.getState().reset();
});

describe('useNewGameSetupStore', () => {
  it('starts with 2 default players and solo mode', () => {
    const state = useNewGameSetupStore.getState();
    expect(state.playerCount).toBe(2);
    expect(state.players).toHaveLength(2);
    expect(state.teamMode).toBe('solo');
    expect(state.teams).toEqual([]);
  });

  it('regenerates named players when the player count changes', () => {
    useNewGameSetupStore.getState().setPlayerCount(4);
    const state = useNewGameSetupStore.getState();
    expect(state.players).toHaveLength(4);
    expect(state.players.map((player) => player.name)).toEqual([
      'Joueur 1',
      'Joueur 2',
      'Joueur 3',
      'Joueur 4',
    ]);
  });

  it('resets team mode and teams when the player count changes', () => {
    useNewGameSetupStore.getState().setPlayerCount(4);
    useNewGameSetupStore.getState().setTeamMode('teams-2');
    useNewGameSetupStore.getState().setPlayerCount(3);

    const state = useNewGameSetupStore.getState();
    expect(state.teamMode).toBe('solo');
    expect(state.teams).toEqual([]);
  });

  it('assigns every player across teams when a team mode is selected', () => {
    useNewGameSetupStore.getState().setPlayerCount(4);
    useNewGameSetupStore.getState().setTeamMode('teams-2');

    const state = useNewGameSetupStore.getState();
    expect(state.teams).toHaveLength(2);
    const assignedIds = state.teams.flatMap((team) => team.playerIds);
    expect(assignedIds.sort()).toEqual(state.players.map((player) => player.id).sort());
  });

  it('moves a player to the next team when cycled', () => {
    useNewGameSetupStore.getState().setPlayerCount(4);
    useNewGameSetupStore.getState().setTeamMode('teams-2');

    const [firstPlayer] = useNewGameSetupStore.getState().players;
    useNewGameSetupStore.getState().cyclePlayerTeam(firstPlayer.id);

    const state = useNewGameSetupStore.getState();
    expect(state.teams[0].playerIds).not.toContain(firstPlayer.id);
    expect(state.teams[1].playerIds).toContain(firstPlayer.id);
  });

  it('does nothing when cycling in solo mode', () => {
    useNewGameSetupStore.getState().setPlayerCount(4);
    const [firstPlayer] = useNewGameSetupStore.getState().players;

    useNewGameSetupStore.getState().cyclePlayerTeam(firstPlayer.id);

    expect(useNewGameSetupStore.getState().teams).toEqual([]);
  });

  it('moves a player to a specific team when assigned directly', () => {
    // Équipes/joueurs posés explicitement (plutôt que via setPlayerCount/setTeamMode)
    // pour avoir des ids garantis distincts, indépendamment de generateId().
    useNewGameSetupStore.setState({
      players: [
        { id: 'p1', name: 'Alice' },
        { id: 'p2', name: 'Bob' },
      ],
      teamMode: 'teams-2',
      teams: [
        { id: 't1', name: 'Équipe 1', color: '#fff', playerIds: ['p1'] },
        { id: 't2', name: 'Équipe 2', color: '#000', playerIds: ['p2'] },
      ],
    });

    useNewGameSetupStore.getState().assignPlayerToTeam('p1', 't2');

    const state = useNewGameSetupStore.getState();
    expect(state.teams[0].playerIds).not.toContain('p1');
    expect(state.teams[1].playerIds).toContain('p1');
  });

  it('does nothing when assigning a player to the team they are already on', () => {
    const before = [
      { id: 't1', name: 'Équipe 1', color: '#fff', playerIds: ['p1'] },
      { id: 't2', name: 'Équipe 2', color: '#000', playerIds: ['p2'] },
    ];
    useNewGameSetupStore.setState({
      players: [
        { id: 'p1', name: 'Alice' },
        { id: 'p2', name: 'Bob' },
      ],
      teamMode: 'teams-2',
      teams: before,
    });

    useNewGameSetupStore.getState().assignPlayerToTeam('p1', 't1');

    expect(useNewGameSetupStore.getState().teams).toEqual(before);
  });

  it('starts with no game type selected', () => {
    expect(useNewGameSetupStore.getState().gameTypeId).toBeUndefined();
  });

  it('selects a game type', () => {
    useNewGameSetupStore.getState().setGameTypeId('game-1');
    expect(useNewGameSetupStore.getState().gameTypeId).toBe('game-1');
  });

  it('keeps the selected game type when the player count changes', () => {
    useNewGameSetupStore.getState().setGameTypeId('game-1');
    useNewGameSetupStore.getState().setPlayerCount(3);

    expect(useNewGameSetupStore.getState().gameTypeId).toBe('game-1');
  });
});
