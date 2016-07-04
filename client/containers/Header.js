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
  ui: state.ui,
  user: state.connection.user,
  gameId: state.connection.currentGame,
  gameState: state.games[state.connection.currentGame],
  loginError: state.requestErrors.login
});

export default connect(mapStateToProps, actions)(HeaderContainer)