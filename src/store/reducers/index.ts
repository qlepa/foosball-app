import { combineReducers } from 'redux';
import { IPlayer, ITeam } from '../actions';
import { availablePlayersReducer } from './availablePlayers';
import { teamsReducer } from './teams';

export interface IStoreState {
    availablePlayers: IPlayer[];
    teams: ITeam[];
}

export const reducers = combineReducers<IStoreState>({
    availablePlayers: availablePlayersReducer,
    teams: teamsReducer,
});