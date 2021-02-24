import { Avatar, Button, FormControl, Grid, ListItemText, makeStyles, MenuItem, Select, Switch, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerToTeam, IPlayer, ITeam, removePlayer } from "../store/actions";
import { IStoreState } from "../store/reducers";
import { teamsState } from "./bussines-logic/rules";
import { PlayerCard } from "./PlayerCard";

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;
const selectTeams = (state: IStoreState) => state.teams;

interface IProps {
    readonly startTheGame: Function;
}

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    teamWrapper: {
        height: '450px',
        textAlign: 'center',
    },
    teamName: {
        color: palette.primary.main,
    },
    playButton: {
        backgroundColor: palette.customGreen.main,
        color: palette.common.white,
        marginTop: spacing(2),
        marginBottom: spacing(2),
        fontSize: typography.pxToRem(18),
    },
    playerSelect: {
        marginTop: spacing(2),
        marginBottom: spacing(2),
    },
}),
{
    name: 'TeamsCreator'
}
);

export function TeamsCreator(props: IProps) {
    const { startTheGame } = props;
    const dispatch = useDispatch();
    const availablePlayers = useSelector(selectAvailablePlayers);
    const teams = useSelector(selectTeams);
    const [activeTeamName, setActiveTeamName] = useState<ITeam['name']>('Team A');
    const enhancedTeams = teamsState(teams);
    const activeTeam = enhancedTeams.find((team) => team.name === activeTeamName)!
    const areTeamsComplete = enhancedTeams.filter((team)=> team.isTeamComplete === false).length > 0;

    const { 
        teamWrapper: teamWrapperClass,
        teamName: teamNameClass,
        playButton: playButtonClass,
        playerSelect: playerSelectClass,
     } = useStyles();

    const handlePlayerClick = (team: ITeam['name'],player: IPlayer) => {
            dispatch(removePlayer(player))
            dispatch(addPlayerToTeam(team, player))
    };

    const handleTeamChange = () => {
        activeTeamName === 'Team A' ? setActiveTeamName('Team B') : setActiveTeamName('Team A')
    };

    const playGame = () => {
        setTimeout(function() {window.location.reload()}, 2000)
        startTheGame()
    };
    
    return (
        <>
            <Grid item xs={12}><Typography align='center'>Choose team</Typography></Grid>
            <Typography>Team A</Typography>
            <Switch onChange={handleTeamChange} />
            <Typography>Team B</Typography>
            <FormControl fullWidth>
                <Select
                    variant='outlined'
                    disabled={activeTeam.isTeamComplete}
                    className={playerSelectClass}
                >
                    <MenuItem disabled>
                        <ListItemText>{`Add player to ${activeTeamName}`}</ListItemText>
                    </MenuItem>
                    {availablePlayers.map((player) => {
                        return (
                            <MenuItem key={player.name} onClick={() => handlePlayerClick(activeTeamName, player)}>
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
            </FormControl>
            <Grid container justify='center' spacing={4}>
                {teams.map((team) => {
                    return (
                        <Grid key={team.name} item xs={12} md={6} className={teamWrapperClass}>
                            <Typography variant='h5' className={teamNameClass}>{team.name}</Typography>
                            {enhancedTeams.find((enhanceTeam) => enhanceTeam.name === team.name)?.isTeamComplete
                            ?
                            <Typography>Team is full!</Typography>
                            :
                            <Typography color='error'>Team is incomplete</Typography>
                            }
                            <Grid container justify='center'>
                                {team.players.map((player) => <PlayerCard key={player.name} player={player} />)}
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <Button onClick={playGame} disabled={areTeamsComplete} fullWidth className={playButtonClass}>Play</Button>
            {areTeamsComplete
            ? 
            <Typography align='center' color='error'>Teams are incomplete</Typography> 
            : 
            null}
        </>
    );
};