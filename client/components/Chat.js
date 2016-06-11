import React, { PropTypes } from 'react'
import ScrollingContent from './ScrollingContent'

export default class Chat extends ScrollingContent {
  render() {
    const { list } = this.props;

    const items = list.map( ({ id, name, text }) => {
      return <li key={id}><b>{name}:</b> {text}</li>;
    });

    return <ul id="chat" className="content" ref="content">{items}</ul>;
  }
}

Chat.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }))
}