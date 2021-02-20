import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState, FunctionComponent } from "react";
import { IPlayer } from "../store/actions";

interface IProps {
    players: IPlayer[];
    removePlayerFromAvailable: any;
}

export function PlayersList(props: IProps) {
    const [aplayers, setPlayers] = useState<IPlayer[]>()
    console.log(props)

    useEffect(() => {
        setPlayers(props.players)
    }, [props.players])

    return <>{aplayers ? aplayers.map((player) => <Button onClick={() => props.removePlayerFromAvailable(player.email)}><Typography>{player.name}</Typography></Button>) : <p>Loading</p>}</>
}