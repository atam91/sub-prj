import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import connection, * as fromConnection from '../../common/reducers/connection'
import Xo from '../games/Xo'
import GameManager from '../components/GameManager'

class GameColumn extends Component {
  render() {
    const {
      user,
      games,
      gameId,
      gameStates,
      joinGame,
      moveGame,
      activeGames
    } = this.props;

    if (!gameId) return null;
    
    const state = gameStates[gameId];
    if (!state) return null;

    const join = (player) => () => {
      joinGame(gameId, player);
    };

    const move = (move) => () => {
      moveGame(gameId, move);
    };



    return <div className="column-area sep-r">
      <Xo key={gameId} user={user} state={state} join={join} move={move} />
      <GameManager { ...this.props } />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  games: state.main.games,
  gameId: state.connection.currentGame,
  gameStates: state.games,
  activeGames: state.connection.games
});

export default connect(mapStateToProps, requestActions)(GameColumn)