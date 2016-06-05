import React, { PropTypes, Component } from 'react'

export default class Chat extends Component {
  render() {
    const { list } = this.props;

    const items = list.map( ({ id, name, text }) => {
      return <li key={id}><b>{name}:</b> {text}</li>;
    });

    return <ul className="chat">{items}</ul>;
  }
}

Chat.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }))
}