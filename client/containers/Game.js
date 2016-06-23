import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import Xo from '../games/Xo'

class Game extends Component {
  render() {
    const { user, gameId, gameState, joinGame, moveGame } = this.props;

    if (!gameId) return null;
    
    const state = gameState[gameId];
    if (!state) return null;

    const join = (player) => () => {
      joinGame(gameId, player);
    };

    const move = (move) => () => {
      moveGame(gameId, move);
    };

    return <div className="sep-r">
      <Xo key={gameId} user={user} state={state} join={join} move={move} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  gameId: state.connection.gameId,
  gameState: state.game
});

export default connect(mapStateToProps, requestActions)(Game)