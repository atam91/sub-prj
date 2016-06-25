import React, { PropTypes } from 'react'
import * as fromGames from '../games';
import ScrollingContent from './ScrollingContent'

export default class Chat extends ScrollingContent {
  watchGame(id) {
    return () => this.props.watchGame(id);
  }
  render() {
    const { list, messages, games, activeGames } = this.props;

    const message = (id) => {
      if (!messages[id]) return null;

      const { from, text } = messages[id];
      return <span><b>{from}:</b> {text}</span>;
    }

    const game = (id) => {
      if (!games[id]) return null;
      const { from, type, data } = games[id];
      const name = fromGames.names[type];
      const bold = (activeGames.indexOf(id) === -1) && 'bold';
      
      return <span>
        <b>{from}:</b> <a className={bold} onClick={this.watchGame(id)}>[{name} game]</a> {data.text}
      </span>;
    }

    const item = (item) => {
      switch (item.type) {
        case 'message':
          return message(item.id);

        case 'game':
          return game(item.id);
      }
    };

    const items = list.map(i => (<li key={i.id}>{item(i)}</li>));

    return <ul id="chat" className="block content" ref="content">{items}</ul>;
  }
}

Chat.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })),
  watchGame: PropTypes.func.isRequired
}