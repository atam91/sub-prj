import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import View from '../components/View'
import Column from '../components/Column'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import Header from './Header'
import Footer from './Footer'
import Game from './Game'

class App extends Component {
  render() {
    const { watchGame } = this.props;
    const { participants, chat, messages, games } = this.props;

    return <div className="app">
      <Header />
      <View>
        <Game />
        <Column>
          <Participants list={participants} />
          <Chat
            list={chat}
            games={games}
            messages={messages}
            watchGame={watchGame} />
        </Column>
      </View>
      <Footer />
    </div>
  }
}

const mapStateToProps = (state) => ({
  chat: state.main.chat,
  games: state.main.games,
  messages: state.main.messages,
  participants: state.main.participants
});

export default connect(mapStateToProps, requestActions)(App)