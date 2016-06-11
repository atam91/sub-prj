import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../components/View'
import Participants from '../components/Participants'
import Chat from '../components/Chat'
import HeaderContainer from './HeaderContainer'
import FooterContainer from './FooterContainer'

class App extends Component {
  scrollDown() {
    this.forceScrollDown = true;
  }
  componentWillUpdate() {
    const scrollWithOffset = document.body.scrollTop + document.body.offsetHeight;
    this.shouldScrollBottom = 
      document.body.offsetHeight && (document.body.scrollHeight === scrollWithOffset);
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom || this.forceScrollDown) {
      window.scrollTo(0, document.body.scrollHeight);
      this.forceScrollDown = false;
    }
  }
  render() {
    const { participants, messages } = this.props.main;

    return <div className="app">
      <HeaderContainer />
      <Participants list={participants} />
      <View>
        <div className="content">
          <Chat list={messages} />
        </div>
      </View>
      <FooterContainer scrollDown={::this.scrollDown} />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    main: state.main
  }
}

export default connect(mapStateToProps)(App)