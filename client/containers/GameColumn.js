import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import connection, * as fromConnection from '../../common/reducers/connection'
import gameComponents from '../games'
import GameManager from '../components/GameManager'

class GameColumn extends Component {
  render() {
    const {
      user,
      chat,
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

    const game = gameComponents[chat.objects[gameId].game];

    return <div className="column-area sep-r">
      {game(gameId, user, state, join, move)}
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