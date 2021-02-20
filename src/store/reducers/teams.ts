import { Action, ITeam, ActionTypes } from '../actions';

const initialState: ITeam[] = [
    {
        name: 'Team A',
        players: []
    },
    {
        name: 'Team B',
        players: []
    }
]

export const teamsReducer = (state: ITeam[] = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.addPlayerToTeam:
            state.map((team) => {
                if (team.name === action.payload.name) {
                    team.players.push(action.payload.player)
                }
            });
            return state;
        default:
            return state;
    }
};