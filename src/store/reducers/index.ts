import { combineReducers } from 'redux';
import { IPlayer, ITeam } from '../actions';
import { playersReducer } from './players';
import { teamsReducer } from './teams';

export interface IStoreState {
    players: IPlayer[];
    teams: ITeam[];
}

export const reducers = combineReducers<IStoreState>({
    players: playersReducer,
    teams: teamsReducer,
});