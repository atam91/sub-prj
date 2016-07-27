import React, { Component } from 'react'
import classNames from 'classnames'
import * as fromGames from '../games';

export default class GameManager extends Component {
  watchGame(id) {
    return () => this.props.watchGame(id);
  }

  labelName(id) {
    const {
      user,
      games,
      gameId
    } = this.props;

    const state = games[id];
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

    return label;
  }

  item(id) {
    const {
      chat,
      watchGame
    } = this.props;

    if (!chat.objects[id]) return null;
    const labelName = this.labelName(id);

    return <span 
      key={id}
      className={classNames('sep label', labelName)}
      onClick={this.watchGame(id)}
      >
      {fromGames.names[chat.objects[id].game]}
    </span>;

  }

  render() {
    const { activeGames, widthStyle } = this.props;

    return <div id="game-manager" className="block content" style={widthStyle}>
      {activeGames.map(id => this.item(id))}
    </div>;
  }
}

GameManager.propTypes = {
  user: React.PropTypes.shape({
    auth: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired
  }),
  chat: React.PropTypes.shape({
    objects: React.PropTypes.object.isRequired
  }),
  games: React.PropTypes.object.isRequired,
  gameId: React.PropTypes.string.isRequired,
  activeGames: React.PropTypes.arrayOf(React.PropTypes.string),
  watchGame: React.PropTypes.func.isRequired,
  widthStyle: React.PropTypes.object.isRequired
}