import React, { PropTypes, Component } from 'react'

export default class ChatManager extends Component {
  setChannel(id) {
    return () => this.props.setChannel(id);
  }

  label(name) {
    let type = 'default';

    if (name === this.props.currentChannel) {
      type = 'primary';
    } else if (this.props.manager.unread.indexOf(name) !== -1) {
      type = 'success';
    }

    return <span 
      className={'sep label label-' + type} 
      key={name} onClick={this.setChannel(name)}>
      {name}
    </span>;
  }

  render() {
    const { users } = this.props;

    if (!users.length) return null;

    const items = users.map(::this.label);

    return <div id="chat-manager" className="block content sep-b">
      {::this.label('#main')}
      {items}
    </div>;
  }
}

ChatManager.propTypes = {
  users: React.PropTypes.arrayOf(PropTypes.string.isRequired),
  setChannel: React.PropTypes.func.isRequired,
  currentChannel: PropTypes.string.isRequired
}