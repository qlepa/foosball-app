export enum TeamState {
    TeamIncomplete ,
    TeamIsFull,
}

const teamSize = 2;

export function teamState (players: number): TeamState {
    if (players === teamSize) {
        return TeamState.TeamIsFull
    } 
    return TeamState.TeamIncomplete
};
