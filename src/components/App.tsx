import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAvailablePlayers } from '../store/actions';
import { IStoreState } from '../store/reducers';
import { PlayerCard } from './PlayerCard';
import { TeamsCreator } from './TeamsCreator';

const selectAvailablePlayers = (state: IStoreState) => state.availablePlayers;

export function App() {
  const dispatch = useDispatch();
  const [view, setView] = useState<'playersList' | 'teamsCreator' | 'loading'>('loading')
  const availablePlayers = useSelector(selectAvailablePlayers);

  useEffect(() => {
    dispatch(loadAvailablePlayers())
    setView('playersList')
  }, [dispatch])

  function renderView(): any {
    switch (view){
      case 'playersList':
        return (
        <div>
          {availablePlayers.map((player) => {
            return <>
              <PlayerCard player={player} />
            </>
          })}
          <Button onClick={() => setView('teamsCreator')}>Create</Button>
        </div>
        )
      case 'teamsCreator':
        return <TeamsCreator goBack={(view) => setView(view)} />
      case 'loading':
      default:
        return <p>Loading</p>
    };
  }

  return (
    <div>
      <header>
        Cybervadis team builder
      </header>
      <body>
        {renderView()}
      </body>
    </div>
  )
}
