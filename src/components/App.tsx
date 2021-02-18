import React from 'react';
import players from '../data/players.json'
import { connect } from 'react-redux';
import { IPlayer, ITeam, loadPlayers } from '../store/actions';
import { IStoreState } from '../store/reducers';

interface IProps {
  players: IPlayer[];
  teams: ITeam[];
  loadPlayers: any;
}

function App() {
  return (
    <div>
      <header>
        <p>
          Try on {players.players[0].name}
        </p>
        <img src="/assets/images/js.jpg"></img>
      </header>
    </div>
  );
}

export default App;
