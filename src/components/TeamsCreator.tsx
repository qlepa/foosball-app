import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayerToTeam, IPlayer, ITeam, removePlayer } from "../store/actions";
import { IStoreState } from "../store/reducers";
import { PlayerCard } from "./PlayerCard";

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;
const selectTeams = (state: IStoreState) => state.teams;

interface IProps {
    goBack: (view: 'playersList' | 'teamsCreator' | 'loading') => void;
}

export function TeamsCreator(props: IProps) {
    const dispatch = useDispatch();
    const { goBack } = props;
    const availablePlayers = useSelector(selectAvailablePlayers);
    const teams = useSelector(selectTeams);
    const [activeTeam, setActiveTeam] = useState<ITeam['name']>('Team A');
    const handleClick = (team: ITeam['name'],player: IPlayer) => {
            dispatch(removePlayer(player))
            dispatch(addPlayerToTeam(team, player))
        }

    return (
        <div>
            <Button onClick={() => goBack('playersList')}>Back to the players list</Button>
            {availablePlayers.map((player: IPlayer) => {
                return <Button onClick={() => handleClick(activeTeam, player)}><PlayerCard player={player} /></Button>
            })}
            {teams.map((team) => {
                return <>
                    <p>{team.name}</p>
                    {team.players.map((player) => <PlayerCard player={player} />)}
                </>
            })}
        </div>
    )
}