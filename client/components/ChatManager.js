import React, { PropTypes, Component } from 'react'
import array from 'lodash/array'
import { MAIN } from '../../common/constants'

export default class ChatManager extends Component {
  setChannel(id) {
    return () => this.props.setChannel(id);
  }

  label(name) {
    let type = 'info';

    if (name === this.props.currentChannel) {
      type = 'primary';
    } else if (this.props.manager.unread.indexOf(name) !== -1) {
      type = 'success';
    } else if (this.props.manager.channels.some(n => n === name)) {
      type = 'warning';
      if (name !== MAIN  && this.props.users.every(n => n !== name)) {
        type = 'default';
      }
    }

    return <span 
      className={'sep label label-' + type} 
      key={name} onClick={this.setChannel(name)}>
      {name}
    </span>;
  }

  render() {
    const { users, manager } = this.props;
    const items = array.union([MAIN], users, manager.channels);

    return <div id="chat-manager" className="block content sep-b">
      {items.map(::this.label)}
    </div>;
  }
}

ChatManager.propTypes = {
  users: React.PropTypes.arrayOf(PropTypes.string.isRequired),
  setChannel: React.PropTypes.func.isRequired,
  currentChannel: PropTypes.string.isRequired
}