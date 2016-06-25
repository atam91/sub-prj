import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import Participants from '../components/Participants'
import Chat from '../components/Chat'

class ChatColumn extends Component {
  render() {
    const {
      watchGame,
      participants,
      chat,
      messages,
      games,
      activeGames
    } = this.props;

    return <div className="flexbox-item-grow column-area">
      <Participants list={participants} />
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
  participants: state.main.participants
});

export default connect(mapStateToProps, requestActions)(ChatColumn)