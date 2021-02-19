import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IPlayer, ITeam, loadPlayers } from '../store/actions';
import { IStoreState } from '../store/reducers';

interface IProps {
  players: IPlayer[];
  teams: ITeam[];
  loadPlayers: any;
}

function _App(props: IProps) {
  const { 
    players, 
    teams, 
    loadPlayers 
   } = props;

  useEffect(() => {
    loadPlayers()
  }, [players, teams])
  console.log(players)
  return (
    <div>
      <header>
        <p>
          Try on
        </p>
      </header>
    </div>
  );
}

const mapStateToProps = ({ players, teams }: IStoreState): { players: IPlayer[], teams: ITeam[] } => {
  return { players, teams };
};

export const App = connect(
  mapStateToProps,
  { loadPlayers }
)(_App);
