import { IAddPlayerToTeamAction, ITeam } from '../actions';
import { ActionTypes } from '../actions';

export const teamsReducer = (state: ITeam[] = [], action: IAddPlayerToTeamAction) => {
    switch (action.type) {
        case ActionTypes.addPlayerToTeam:
            // Znajdź druzynę i dodaj na końcu playera.
            return {
                ...state,
                teams: state.map((team) => team.name === action.payload.name ? team.players.push(action.payload.player) : team)
                // teams: state.teams.find((team) => team.name === action.payload.name)?.players.push(action.payload.player)
            };
        default:
            return state;
    }
};