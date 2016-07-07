import React, { PropTypes } from 'react'
import * as fromGames from '../games';
import ScrollingContent from './ScrollingContent'
import {
  GAME,
  MESSAGE
} from '../../common/constants'

export default class Chat extends ScrollingContent {
  watchGame(id) {
    return () => this.props.watchGame(id);
  }

  message(id) {
    const { chat } = this.props;

    if (!chat.objects[id]) return null;
    const { from, text } = chat.objects[id];

    return <span><b>{from}:</b> {text}</span>;
  }

  game(id) {
    const { chat, games } = this.props;

    const { from, game, data } = chat.objects[id];
    const name = fromGames.names[game];
    const bold = (games.indexOf(id) === -1) && 'bold';
    
    return <span>
      <b>{from}:</b> <a className={bold} onClick={this.watchGame(id)}>[{name} game]</a> {data.text}
    </span>;

  }

  item(id) {
    const { chat } = this.props;
    if (!chat.objects[id]) return null;

    switch (chat.objects[id].type) {
      case MESSAGE:
        return this.message(id);

      case GAME:
        return this.game(id);

      default:
        return null;
    }
  }

  render() {
    const { chat } = this.props;
    const { currentChannel } = this.props.ui;

    const channel = chat.channels[currentChannel] || [];
    const items = channel.map(id => (<li key={id}>{this.item(id)}</li>));

    return <ul id="chat" className="block content" ref="content">{items}</ul>;
  }
}

Chat.propTypes = {
  ui: React.PropTypes.shape({
    currentChannel: PropTypes.string.isRequired
  }),
  games: React.PropTypes.arrayOf(PropTypes.string.isRequired),
  chat: React.PropTypes.shape({
    objects: PropTypes.object.isRequired,
    channels: PropTypes.object.isRequired
  }),
  watchGame: PropTypes.func.isRequired
}