import React, { Component } from 'react'
import classNames from 'classnames'
import * as fromGames from '../games';

export default class GameManager extends Component {
  watchGame(id) {
    return () => this.props.watchGame(id);
  }
  render() {
    const {
      user,
      games,
      gameId,
      gameStates,
      activeGames,
      watchGame
    } = this.props;

    const items = activeGames.map((id) => {
      const state = gameStates[id];
      let label = 'label-default';

      if (id === gameId) {
        label = 'label-primary';
      } else if (state.players.some(p => p.name === user.name)) {
        label = 'label-warning';
        if (state.moves !== -1 && !state.wins
          && user.name === state.players[state.moves].name
        ) {
          label = 'label-success';
        }
      } else if (!state.players.every(p => p.name)) {
        label = 'label-info';
      }

      return <span 
        key={id}
        className={classNames('sep label', label)}
        onClick={this.watchGame(id)}
        >
        {fromGames.names[games[id].type]}
      </span>;
    });

    return <div id="game-manager" className="block content">
      {items}
    </div>;
  }
}

GameManager.propTypes = {
  user: React.PropTypes.shape({
    auth: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired
  }),
  games: React.PropTypes.object.isRequired,
  gameId: React.PropTypes.string,
  gameStates: React.PropTypes.object.isRequired,
  activeGames: React.PropTypes.arrayOf(React.PropTypes.string),
  watchGame: React.PropTypes.func.isRequired
}