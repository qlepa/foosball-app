import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IPlayer } from "../store/actions";

interface IProps {
    player: IPlayer;
    handlePlayerClick?: Function;
}

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    cardWrapper: {
        display: 'flex',
        cursor: 'pointer',
        padding: spacing(1),
        width: 300,
    },
    playerSmallPhoto: {
        height: 150,
        width: 100,
    },
    playerLargePhoto: {
        height: 300,
        width: 200,
    },
    playerCardContent: {
        textAlign: 'left',
    },
}),
{
    name: 'PlayerCard'
}
);


export function PlayerCard(props: IProps) {
    const {
        player,
        handlePlayerClick,
    } = props;
    const [open, setOpen] = React.useState(false);
    const {
        cardWrapper: cardWrapperClass,
        playerSmallPhoto: playerSmallPhotoClass,
        playerLargePhoto: playerLargePhotoClass,
        playerCardContent: playerCardContentClass,
    } = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
      };

    return (
        <Grid item>
            <Card onClick={handleClickOpen} className={cardWrapperClass}>
                <Grid container>
                    <Grid item xs={8}>
                        <CardContent className={playerCardContentClass}>
                            <Typography>{player.name}</Typography>
                            <Typography>Level: {player.level}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                        <Avatar variant='square' className={playerSmallPhotoClass} src={player.photo} />
                    </Grid>
                </Grid>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    {player.name}
                    <Typography>Level: {player.level}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justify='space-between'>
                        <Grid item md={8}>
                            <Typography>Games played: {player.gamesPlayed}</Typography>
                            <Typography>Games won: {player.victories}</Typography>
                            <Typography>Games scored: {player.goalsScored}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            <Avatar variant='square' className={playerLargePhotoClass} src={player.photo} />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}