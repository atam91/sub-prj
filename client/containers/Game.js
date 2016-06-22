import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import Xo from '../games/Xo'

class Game extends Component {
  render() {
    const { user, game, gameState, joinGame, moveGame } = this.props;

    if (!game.game) return null;
    
    const state = gameState[game.id];
    if (!state) return null;

    const join = (player) => () => {
      joinGame(game.id, player);
    };

    const move = (move) => () => {
      moveGame(game.id, move);
    };

    return <div className="sep-r">
      <Xo key={game.id} game={game} user={user} state={state} join={join} move={move} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  game: state.connection.game,
  gameState: state.game
});

export default connect(mapStateToProps, requestActions)(Game)