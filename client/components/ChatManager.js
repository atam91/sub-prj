import React, { PropTypes, Component } from 'react'

const label = (type = 'default') => (name) => (
  <span className={'sep label label-' + type} key={name}>{name}</span>
);

export default class ChatManager extends Component {
  render() {
    const { users } = this.props;

    if (!users.length) return null;

    const items = users.map(label());

    return <div id="chat-manager" className="block content sep-b">
      {label('primary')('#main')}
      {items}
    </div>;
  }
}

ChatManager.propTypes = {
  users: React.PropTypes.arrayOf(PropTypes.string.isRequired)
}