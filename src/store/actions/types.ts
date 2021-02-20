import { ILoadAvailablePlayersAction, IRemovePlayerAction } from "./availablePlayers";
import { IAddPlayerToTeamAction } from "./teams";

export enum ActionTypes {
    loadAvailablePlayers,
    addPlayerToTeam,
    removePlayer,
}

export type Action = ILoadAvailablePlayersAction | IRemovePlayerAction | IAddPlayerToTeamAction;