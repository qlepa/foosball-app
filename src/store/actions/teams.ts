import { Dispatch } from 'redux';
import { IPlayer } from './players';
import { ActionTypes } from './types';

export interface ITeam {
    name: 'Team A' | 'Team B';
    players: IPlayer[];
}

export interface IAddPlayerToTeamAction {
    type: ActionTypes.addPlayerToTeam,
    payload: {
        name: ITeam["name"],
        player: IPlayer,
    }
}

export const addPlayerToTeam = (team: ITeam["name"], player: IPlayer) => {
    return (dispatch: Dispatch) => {
        dispatch<IAddPlayerToTeamAction>({
            type: ActionTypes.addPlayerToTeam,
            payload: {
                name: team,
                player: player
            }
        });
    };
};