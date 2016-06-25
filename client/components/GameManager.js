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
      let label = 'label-default';
      
      const state = gameStates[id];
      if (state.players.some(p => p.name === user.name)) {
        label = 'label-warning';
        if (state.moves !== -1 && !state.wins
          && user.name === state.players[state.moves].name
        ) {
          label = 'label-success';
        }
      }
      if (id === gameId) label = 'label-primary';

      const name = fromGames.names[games[id].type];

      return <span 
        key={id}
        className={classNames('sep label', label)}
        onClick={this.watchGame(id)}
        >
        {name}
      </span>;
    });

    return <div id="game-manager" className="block content">
      {items}
    </div>;
  }
}