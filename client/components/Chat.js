import React, { PropTypes } from 'react'
import ScrollingContent from './ScrollingContent'

export default class Chat extends ScrollingContent {
  watchGame(id) {
    return () => this.props.watchGame(id);
  }
  render() {
    const { list } = this.props;

    const message = ({ name, text }) => (<span>
      <b>{name}:</b> {text}
    </span>);

    const game = ({ id, name, game }) => (<span>
      <b>{name}:</b> <a onClick={this.watchGame(id)}>[Game {game}]</a>
    </span>);

    const item = (item) => {
      switch (item.type) {
        case 'text':
          return message(item);

        case 'game':
          return game(item);
      }
    };

    const items = list.map(i => (<li key={i.id}>{item(i)}</li>));

    return <ul id="chat" className="block content" ref="content">{items}</ul>;
  }
}

Chat.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string
  })),
  watchGame: PropTypes.func.isRequired
}