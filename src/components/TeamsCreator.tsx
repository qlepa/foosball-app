import { Avatar, Button, Grid, ListItemText, makeStyles, MenuItem, Select, Switch, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerToTeam, IPlayer, ITeam, removePlayer } from "../store/actions";
import { IStoreState } from "../store/reducers";
import { TeamState, teamState } from "./bussines-logic/rules";
import { PlayerCard } from "./PlayerCard";

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;
const selectTeams = (state: IStoreState) => state.teams;

const useStyles = makeStyles(({ palette }) => ({
    teamWrapper: {
        textAlign: 'center',
    },
    teamName: {
        color: palette.primary.main,
    },
    playButton: {
        margin: '10px 0 10px',
    },
}),
{
    name: 'TeamsCreator'
}
);

export function TeamsCreator() {
    const { 
        teamWrapper: teamWrapperClass,
        teamName: teamNameClass,
        playButton: playButtonClass,
     } = useStyles();
    const dispatch = useDispatch();
    const availablePlayers = useSelector(selectAvailablePlayers);
    const teams = useSelector(selectTeams);
    const [activeTeam, setActiveTeam] = useState<ITeam['name']>('Team A');
    const [isTeamAReady, setTeamAStatus] = useState<boolean>(false);
    const [isTeamBReady, setTeamBStatus] = useState<boolean>(false);

    useEffect(
        () => {
            teams.forEach((team) => {
                if (teamState(team) === TeamState.TeamIsFull) {
                    switch (team.name) {
                        case 'Team A':
                            setTeamAStatus(true);
                            break;
                        case 'Team B':
                            setTeamBStatus(true);
                            break;
                    }  
                } else if (teamState(team) === TeamState.TeamIncomplete) {
                    switch (team.name) {
                        case 'Team A':
                            setTeamAStatus(false);
                            break;
                        case 'Team B':
                            setTeamBStatus(false);
                            break;

                    }  
                }
            })
        }, [availablePlayers, teams]
    )
    const handleClick = (team: ITeam['name'],player: IPlayer) => {
            dispatch(removePlayer(player))
            dispatch(addPlayerToTeam(team, player))
    };
    const teamStatus = (team: ITeam): JSX.Element => {
        const state = teamState(team)
        switch(state) {
            case TeamState.TeamIncomplete:
                return <Typography color='error'>Team are incomplete</Typography>
            case TeamState.TeamIsFull:
                return <Typography>Team is full!</Typography>
        }
    }
    const handleTeamChange = () => {
        activeTeam === 'Team A' ? setActiveTeam('Team B') : setActiveTeam('Team A')
    }
    function disableSelect() {
        switch(activeTeam) {
            case 'Team A':
                return isTeamAReady;
            case 'Team B':
                return isTeamBReady;
            default:
                return false
        };
    };
    
    return (
        <>
            <Grid item xs={12}><Typography align='center'>Choose team</Typography></Grid>
            <Typography>Team A</Typography>
            <Switch onChange={handleTeamChange} />
            <Typography>Team B</Typography>
            <Select
                disableUnderline
                fullWidth
                disabled={disableSelect()}
            >
                <MenuItem disabled>
                    <ListItemText>{`Add player to ${activeTeam}`}</ListItemText>
                </MenuItem>
                {availablePlayers.map((player) => {
                    return (
                        <MenuItem key={player.name} onClick={() => handleClick(activeTeam, player)}>
                            <ListItemText>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Typography>
                                            {player.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar src={player.photo} />
                                    </Grid>
                                </Grid>
                            </ListItemText>
                        </MenuItem>
                    )
                })}
            </Select>
            <Grid container justify='center' spacing={4}>
                {teams.map((team) => {
                    return (
                        <Grid key={team.name} item xs={12} md={6} className={teamWrapperClass}>
                            <Typography variant='h5' className={teamNameClass}>{team.name}</Typography>
                            {teamStatus(team)}
                            <Grid container justify='center' spacing={1}>
                                {team.players.map((player) => <PlayerCard key={player.name} player={player} />)}
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <Button onClick={() => console.log('PLAY!')} disabled={!isTeamAReady || !isTeamBReady} fullWidth className={playButtonClass}>Play</Button>
            {!isTeamAReady || !isTeamBReady 
            ? 
            <Typography align='center' color='error'>Teams are incomplete</Typography> 
            : 
            null}
        </>
    );
};