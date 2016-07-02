import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import ChatManager from '../components/ChatManager'
import Chat from '../components/Chat'

class ChatColumn extends Component {
  render() {
    const {
      watchGame,
      users,
      chat,
      messages,
      games,
      activeGames
    } = this.props;

    return <div className="flexbox-item-grow column-area">
      <ChatManager users={users} />
      <Chat
        list={chat}
        games={games}
        activeGames={activeGames}
        messages={messages}
        watchGame={watchGame} />
    </div>
  }
}

const mapStateToProps = (state) => ({
  chat: state.main.chat,
  games: state.main.games,
  activeGames: state.connection.games,
  messages: state.main.messages,
  users: state.main.participants
});

export default connect(mapStateToProps, requestActions)(ChatColumn)