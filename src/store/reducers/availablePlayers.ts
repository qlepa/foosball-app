import { IPlayer, Action, ActionTypes } from '../actions';

export const availablePlayersReducer = (
    state: IPlayer[] = [], 
    action: Action
    ) => {
    switch (action.type) {
        case ActionTypes.loadAvailablePlayers:
            return action.payload;
        case ActionTypes.removePlayer:
            return state.filter((player: IPlayer) => player !== action.payload);
        default:
            return state;
    }
};