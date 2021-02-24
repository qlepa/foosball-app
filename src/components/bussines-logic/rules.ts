import { ITeam } from "../../store/actions";

interface EnhancedTeam extends ITeam {
    isTeamComplete: boolean;
}

const teamSize = 2;

export function teamsState (teams: ITeam[]): EnhancedTeam[] {
    return teams.map((team) => {
        return {
            ...team,
            isTeamComplete: team.players.length === teamSize,
        }
    })
};