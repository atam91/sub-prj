import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Column from '../components/Column'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import Header from './Header'
import Footer from './Footer'
import Game from './Game'

class App extends Component {
  render() {
    const { participants, messages } = this.props.main;

    return <div className="app">
      <Header />
      <View>
        <Game />
        <Column>
          <Participants list={participants} />
          <Chat list={messages} />
        </Column>
      </View>
      <Footer />
    </div>
  }
}

const mapStateToProps = (state) => ({
  main: state.main
});

export default connect(mapStateToProps)(App)