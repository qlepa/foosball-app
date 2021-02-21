import { ITeam } from "../../store/actions";

export enum TeamState {
    TeamIncomplete ,
    TeamIsFull,
}

const teamSize = 2;

export function teamState (team: ITeam): TeamState {
    if (team.players.length === teamSize) {
        return TeamState.TeamIsFull
    } 
    return TeamState.TeamIncomplete
};