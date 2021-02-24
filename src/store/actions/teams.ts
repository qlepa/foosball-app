import { IPlayer } from './availablePlayers';
import { ActionTypes } from './types';

export interface ITeam {
    readonly name: 'Team A' | 'Team B';
    readonly players: IPlayer[];
}

export interface IAddPlayerToTeamAction {
    type: ActionTypes.addPlayerToTeam,
    payload: {
        name: ITeam['name'],
        player: IPlayer,
    }
}

export const addPlayerToTeam = (team: ITeam['name'], player: IPlayer) => {
    return {
        type: ActionTypes.addPlayerToTeam,
        payload: {
            name: team,
            player: player
        }
    };
};
