import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import actions from '../actions'

class HeaderContainer extends Component {
  render() {
    return <Header {  ...this.props } />;
  }
}

const mapStateToProps = (state) => ({
  channel: state.ui.currentChannel,
  user: state.connection.user,
  gameId: state.ui.currentGame,
  gameState: state.games[state.ui.currentGame],
  loginError: state.requestErrors.login
});

export default connect(mapStateToProps, actions)(HeaderContainer)