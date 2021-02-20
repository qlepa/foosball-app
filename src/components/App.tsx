import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IPlayer, ITeam, loadAvailablePlayers, removePlayer, addPlayerToTeam } from '../store/actions';
import { IStoreState } from '../store/reducers';
import { PlayerCard } from './PlayerCard';
import { TeamsCreator } from './TeamsCreator';

interface IProps {
  availablePlayers: IPlayer[];
  teams: ITeam[];
  loadAvailablePlayers: Function;
  removePlayer: typeof removePlayer;
  addPlayerToTeam: typeof addPlayerToTeam;
}

function _App(props: IProps) {
  const { 
    availablePlayers, 
    teams, 
    loadAvailablePlayers, 
    removePlayer,
    addPlayerToTeam,
   } = props;

  const [view, setView] = useState<'playersList' | 'teamsCreator' | 'loading'>('loading')

  useEffect(() => {
    loadAvailablePlayers()
    setView('playersList')
  }, [loadAvailablePlayers])

  const removePlayerFromAvailable = (player: IPlayer): void => {
    removePlayer(player)
  }

  const addPlayerToActiveTeam = (team: ITeam['name'], player: IPlayer) => {
    addPlayerToTeam(team, player)
  }

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
        return <TeamsCreator addPlayerToTeam={addPlayerToActiveTeam} availablePlayers={availablePlayers} teams={teams} removePlayerFromAvailable={removePlayerFromAvailable} goBack={(view) => setView(view)} />
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

const mapStateToProps = ({ availablePlayers, teams }: IStoreState): { availablePlayers: IPlayer[], teams: ITeam[] } => {
  return { availablePlayers, teams };
};

export const App = connect(
  mapStateToProps,
  { loadAvailablePlayers, removePlayer, addPlayerToTeam }
)(_App);
