import { Dispatch } from 'redux';
import availablePlayersData from '../../data/players.json';
import { ActionTypes } from './types';

export interface IPlayer {
    readonly name: string;
    readonly level: string;
    readonly victories: string;
    readonly goalsScored: string;
    readonly gamesPlayed: string;
    readonly email: string;
    readonly photo: string;
}

export interface ILoadAvailablePlayersAction {
    type: ActionTypes.loadAvailablePlayers;
    payload: IPlayer[];
}

export interface IRemovePlayerAction {
    type: ActionTypes.removePlayer;
    payload: IPlayer;
}

export const loadAvailablePlayers = () => {
    return (dispatch: Dispatch) => {
        dispatch<ILoadAvailablePlayersAction>({
            type: ActionTypes.loadAvailablePlayers,
            payload: availablePlayersData.players
        });
    };
};

export const removePlayer = (player: IPlayer): IRemovePlayerAction => {
    return {
        type: ActionTypes.removePlayer,
        payload: player
    };
};