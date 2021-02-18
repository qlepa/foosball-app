import { IPlayer, ILoadPlayersAction } from '../actions';
import { ActionTypes } from '../actions';

export const playersReducer = (state: IPlayer[] = [], action: ILoadPlayersAction) => {
    switch (action.type) {
        case ActionTypes.loadPlayers:
            return action.payload;
        default:
            return state;
    }
};