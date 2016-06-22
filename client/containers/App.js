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
    const { participants, chat } = this.props.main;

    return <div className="app">
      <Header />
      <View>
        <Game />
        <Column>
          <Participants list={participants} />
          <Chat list={chat} watchGame={watchGame} />
        </Column>
      </View>
      <Footer />
    </div>
  }
}

const mapStateToProps = (state) => ({
  main: state.main
});

export default connect(mapStateToProps, requestActions)(App)