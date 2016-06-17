import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Column from '../components/Column'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'

class App extends Component {
  render() {
    const { participants, messages } = this.props.main;

    return <div className="app">
      <HeaderContainer />
      <View>
        <div className="block content game sep-r">
          <div className="center">
            <b>player1: X</b>
          </div>
          <table className="center">
            <tr>
              <td className="available"></td>
              <td className="available">O</td>
              <td className="available">X</td>
            </tr>
            <tr>
              <td>O</td>
              <td>X</td>
              <td>X</td>
            </tr>
            <tr>
              <td></td>
              <td>O</td>
              <td>X</td>
            </tr>
          </table>
          <div className="center">
            <span>player2: O</span>
          </div>
        </div>
        <Column>
          <Participants list={participants} />
          <Chat list={messages} />
        </Column>
      </View>
      <FooterContainer />
    </div>
  }
}

const mapStateToProps = (state) => ({
  main: state.main
});

export default connect(mapStateToProps)(App)