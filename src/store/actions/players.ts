import { Dispatch } from 'redux';
import playersData from '../../data/players.json';
import { ActionTypes } from './types';

export interface IPlayer {
    name: string;
    level: string;
    victories: string;
    goalsScored: string;
    gamesPlayed: string;
    email: string;
    photo: string;
}

export interface ILoadPlayersAction {
    type: ActionTypes.loadPlayers,
    payload: IPlayer[]
}

export const loadPlayers = () => {
    return (dispatch: Dispatch) => {
        dispatch<ILoadPlayersAction>({
            type: ActionTypes.loadPlayers,
            payload: playersData.players
        });
    };
};