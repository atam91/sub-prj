import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Participants from '../components/Participants'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'

class App extends Component {
  render() {
    const { participants } = this.props

    return <div>
      <HeaderContainer />
      <View>
        <Participants {...participants} />
      </View>
      <FooterContainer />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    participants: state.participants
  }
}

export default connect(mapStateToProps)(App)