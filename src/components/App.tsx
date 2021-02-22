import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAvailablePlayers } from '../store/actions';
import { IStoreState } from '../store/reducers';
import { PlayerCard } from './PlayerCard';
import { TeamsCreator } from './TeamsCreator';

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;

export function App() {
  const dispatch = useDispatch();
  const [view, setView] = useState<'playersList' | 'teamsCreator' | 'loading'>('loading');
  const availablePlayers = useSelector(selectAvailablePlayers);

  useEffect(() => {
    dispatch(loadAvailablePlayers())
    setView('playersList')
  }, [dispatch])

  function renderView(): JSX.Element {
    switch (view){
      case 'playersList':
        return (
        <>
          <Grid item xs={12}><Button onClick={() => setView('teamsCreator')} fullWidth>Create</Button></Grid>
          {availablePlayers.map((player) => {
            return <>
              <PlayerCard player={player} />
            </>
          })}
        </>
        )
      case 'teamsCreator':
        return <TeamsCreator />
      case 'loading':
      default:
        return <p>Loading</p>
    };
  };

  return (
    <div>
      <header>
        <Grid container justify='space-between'>
          <Typography variant="h4" component="h1">Cybervadis team builder</Typography>
          <Button onClick={() => setView('playersList')}>Back to the players list</Button>
        </Grid>
      </header>
      <body>
        <Grid container spacing={1} justify='center'>
          {renderView()}
        </Grid>
      </body>
    </div>
  );
};
