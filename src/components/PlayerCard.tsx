import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IPlayer } from "../store/actions";

interface IProps {
    player: IPlayer;
    handlePlayerClick?: Function;
}

export function PlayerCard(props: IProps) {
    const {
        player,
        handlePlayerClick,
    } = props;

    return (
        <Button onClick={handlePlayerClick ? handlePlayerClick() : null}>
            {player.name}
        </Button>
    )
}