import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'

class App extends Component {
  render() {
    const { participants, chat } = this.props

    return <div>
      <HeaderContainer />
      <View>
        <Participants { ...participants } />
        <Chat { ...chat } />
      </View>
      <FooterContainer />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    participants: state.participants,
    chat: state.chat
  }
}

export default connect(mapStateToProps)(App)