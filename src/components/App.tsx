import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAvailablePlayers } from '../store/actions';
import { IStoreState } from '../store/reducers';
import { PlayerCard } from './PlayerCard';
import { TeamsCreator } from './TeamsCreator';

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;

const useStyles = makeStyles(({ palette, spacing }) => ({
  headerWrapper: {
      backgroundColor: palette.secondary.main,
      padding: spacing(2),
      color: palette.common.white,
      marginBottom: spacing(1),
  },
  bodyWrapper: {
    paddingRight: spacing(2),
    paddingLeft: spacing(2),
  },
  button: {
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    marginBottom: spacing(1),
  },
  gameStarted: {
    height: '100vh',
    width: '100vw',
    backgroundColor: palette.common.black,
    opacity: 0.3,
    position: 'fixed',
    top: 0,
    zIndex: 1,
  },
  displayNone: {
    display: 'none',
  },
}),
{
  name: 'App'
}
);


export function App() {
  const dispatch = useDispatch();
  const [view, setView] = useState<'playersList' | 'teamsCreator' | 'loading'>('loading');
  const [gameStarted, setGameStarted] = useState(false);
  const availablePlayers = useSelector(selectAvailablePlayers);

  const { 
    headerWrapper: headerWrapperClass,
    bodyWrapper: bodyWrapperClass,
    button: buttonClass,
    gameStarted: gameStartedClass,
    displayNone: displayNoneClass,
   } = useStyles();

  useEffect(() => {
    dispatch(loadAvailablePlayers())
    setView('playersList')
  }, [dispatch])

  const startTheGame = () => {
    setGameStarted(true);
  };

  const renderView = () => {
      switch (view){
        case 'playersList':
          return (
          <>
            <Grid item xs={12}>
              <Button onClick={() => setView('teamsCreator')} fullWidth className={buttonClass}>Create</Button>
            </Grid>
            {availablePlayers.map((player) => {
              return <PlayerCard player={player} key={player.name} />
            })}
          </>
          )
        case 'teamsCreator':
          return <TeamsCreator startTheGame={startTheGame} />
        case 'loading':
        default:
          return <Grid item xs={12}><p>Loading</p></Grid>
      };
    };

  return (
    <>
      <header>
        <Grid container justify='space-between' className={headerWrapperClass}>
          <Typography variant="h4" component="h1">Foosball team builder</Typography>
          {view === 'teamsCreator' ? <Button onClick={() => setView('playersList')} className={buttonClass}>Back to the players list</Button> : null}
        </Grid>
      </header>
      <Box>
      <Grid container justify='center' className={bodyWrapperClass}>
        {renderView()}
      </Grid>
      </Box>
      <div className={clsx(!gameStarted ? displayNoneClass : undefined, gameStartedClass)}>

      </div>
    </>
  );
};
