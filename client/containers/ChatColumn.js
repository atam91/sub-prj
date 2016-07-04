import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import ChatManager from '../components/ChatManager'
import Chat from '../components/Chat'
import { MAIN } from '../../common/constants'

class ChatColumn extends Component {
  render() {
    const {
      ui,
      chat,
      users,
      games,
      watchGameRequest,
      setChannel
    } = this.props;

    return <div className="flexbox-item-grow column-area">
      <ChatManager 
        users={users}
        setChannel={setChannel}
        currentChannel={ui.currentChannel} />
      <Chat
        ui={ui}
        chat={chat}
        games={games}
        watchGame={watchGameRequest} />
    </div>
  }
}

const mapStateToProps = (state) => ({
  ui: state.ui,
  chat: state.common.chat,
  users: state.common.users,
  games: state.connection.games
});

export default connect(mapStateToProps, actions)(ChatColumn)