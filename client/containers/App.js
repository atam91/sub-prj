import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as requestActions from '../actions/RequestActions'
import View from '../components/View'
import Header from './Header'
import Footer from './Footer'
import GameColumn from './GameColumn'
import ChatColumn from './ChatColumn'

class App extends Component {
  render() {
    const { watchGame } = this.props;
    const { participants, chat, messages, games } = this.props;

    return <div className="app">
      <Header />
      <View>
        <GameColumn />
        <ChatColumn />
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