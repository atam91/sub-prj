import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import connection, * as fromConnection from '../../common/reducers/connection'
import Xo from '../games/Xo'
import GameManager from '../components/GameManager'

class GameColumn extends Component {
  render() {
    const {
      user,
      games,
      gameId,
      joinGame,
      moveGame
    } = this.props;

    if (!gameId) return null;
    
    const state = games[gameId];
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
  chat: state.common.chat,
  games: state.games,
  user: state.connection.user,
  activeGames: state.connection.games,
  gameId: state.ui.currentGame
});

export default connect(mapStateToProps, actions)(GameColumn)