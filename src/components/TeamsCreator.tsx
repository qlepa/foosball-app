import { Avatar, Button, Grid, ListItemText, makeStyles, MenuItem, Select, Switch, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerToTeam, IPlayer, ITeam, removePlayer } from "../store/actions";
import { IStoreState } from "../store/reducers";
import { TeamState, teamState } from "./bussines-logic/rules";
import { PlayerCard } from "./PlayerCard";

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;
const selectTeams = (state: IStoreState) => state.teams;

interface IProps {
    goBack: (view: 'playersList' | 'teamsCreator' | 'loading') => void;
}

const useStyles = makeStyles(({ palette }) => ({
    teamName: {
        color: palette.primary.main,
    }
}),
{
    name: 'TeamsCreator'
}
);

export function TeamsCreator(props: IProps) {
    const { teamName: teamNameClass } = useStyles();
    const dispatch = useDispatch();
    const { goBack } = props;
    const availablePlayers = useSelector(selectAvailablePlayers);
    const teams = useSelector(selectTeams);
    const [activeTeam, setActiveTeam] = useState<ITeam['name']>('Team A');
    const handleClick = (team: ITeam['name'],player: IPlayer) => {
            dispatch(removePlayer(player))
            dispatch(addPlayerToTeam(team, player))
        };
    const teamStatus = (team: ITeam) => {
        const state = teamState(team.players.length)
        switch(state) {
            case TeamState.TeamIncomplete:
                return <p>Drużyna niekompletna</p>
            case TeamState.TeamIsFull:
                console.log('ops')
                return <p>Drużyna pełna</p>
        }
    }

    const handleTeamChange = () => {
        activeTeam === 'Team A' ? setActiveTeam('Team B') : setActiveTeam('Team A')
    }
    return (
        <div>
            <Button onClick={() => goBack('playersList')}>Back to the players list</Button>
            <Select
                disableUnderline
                fullWidth
            >
                <MenuItem disabled>
                    <ListItemText>{`Add player to ${activeTeam}`}</ListItemText>
                </MenuItem>
                {availablePlayers.map((player) => {
                    return (
                        <MenuItem onClick={() => handleClick(activeTeam, player)}>
                            <ListItemText>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Typography>
                                            {player.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar src={`${player.photo}`} />
                                    </Grid>
                                </Grid>
                            </ListItemText>
                        </MenuItem>
                    )
                })}
            </Select>
            <Switch onChange={handleTeamChange} />
            {teams.map((team) => {
                return <>
                    <p className={teamNameClass}>{team.name}</p>
                    {team.players.map((player) => <PlayerCard player={player} />)}
                    {teamStatus(team)}
                </>
            })}
        </div>
    );
};