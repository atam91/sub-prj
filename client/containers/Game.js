import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import Xo from '../games/Xo'

class Game extends Component {
  render() {
    const { user, game, gameState, joinGame } = this.props;

    if (!game.game) return null;
    
    const state = gameState[game.id];
    if (!state) return null;

    const join = (player) => () => {
      joinGame(game.id, player);
    };

    return <div className="sep-r">
      <Xo game={game} user={user} state={state} join={join} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  game: state.connection.game,
  gameState: state.game
});

export default connect(mapStateToProps, requestActions)(Game)