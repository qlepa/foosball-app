import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { IPlayer, ITeam } from "../store/actions";
import { PlayerCard } from "./PlayerCard";

interface IProps {
    readonly availablePlayers: IPlayer[];
    teams: ITeam[];
    removePlayerFromAvailable: any;
    goBack: (view: 'playersList' | 'teamsCreator' | 'loading') => void;
    addPlayerToTeam: Function;
}

export function TeamsCreator(props: IProps) {
    const {
        availablePlayers,
        teams,
        removePlayerFromAvailable,
        goBack,
        addPlayerToTeam,
    } = props;

    const [activeTeam, setActiveTeam] = useState<ITeam['name']>('Team A');

    const handleClick = (team: ITeam['name'],player: IPlayer) => {
        removePlayerFromAvailable(player)
        addPlayerToTeam(team, player)
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