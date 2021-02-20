import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IPlayer, ITeam, loadAvailablePlayers, removePlayer } from '../store/actions';
import { IStoreState } from '../store/reducers';
import { PlayersList } from './PlayersList';

interface IProps {
  availablePlayers: IPlayer[];
  teams: ITeam[];
  loadAvailablePlayers: Function;
  removePlayer: typeof removePlayer;
}

function _App(props: IProps) {
  const { 
    availablePlayers, 
    teams, 
    loadAvailablePlayers, 
    removePlayer,
   } = props;

  //  const [aplayers, setPlayers] = useState<IPlayer[]>()

  useEffect(() => {
    loadAvailablePlayers()
  }, [loadAvailablePlayers])

  // useEffect(() => {
  //   setPlayers(availablePlayers)
  // }, [availablePlayers])

  const removePlayerFromAvailable = (email: string): void => {
    console.log('DONNNNNNE', email)
    removePlayer(email)
  }
  function renderAvailablePlayers(): JSX.Element[] {
    return availablePlayers.map((player) => {
      return <Button onClick={() => removePlayerFromAvailable(player.email)}><Typography>{player.name}</Typography></Button>
    })
  }
  console.log(availablePlayers)
  return (
    <div>
      <header>
        {/* <PlayersList players={availablePlayers} removePlayerFromAvailable={removePlayerFromAvailable} /> */}
        {renderAvailablePlayers()}
        {/* {aplayers ? aplayers.map((player) => {
          return <Button onClick={() => removePlayerFromAvailable(player.email)}><Typography>{player.name}</Typography></Button>
        }) : <p>Loading</p>} */}
      </header>
    </div>
  );
}

const mapStateToProps = ({ availablePlayers, teams }: IStoreState): { availablePlayers: IPlayer[], teams: ITeam[] } => {
  return { availablePlayers, teams };
};

export const App = connect(
  mapStateToProps,
  { loadAvailablePlayers, removePlayer }
)(_App);
