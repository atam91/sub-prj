import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'

class App extends Component {
  render() {
    const { participants, messages } = this.props.main;

    return <div className="app">
      <HeaderContainer />
      <Participants list={participants} />
      <View>
        <Chat list={messages} />
      </View>
      <FooterContainer />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    main: state.main
  }
}

export default connect(mapStateToProps)(App)