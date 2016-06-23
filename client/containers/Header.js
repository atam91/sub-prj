import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import * as requestActions from '../actions/RequestActions'

class HeaderContainer extends Component {
  render() {
    return <Header {  ...this.props } />;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  gameId: state.connection.activeGame,
  gameState: state.games[state.connection.activeGame],
  loginError: state.requestErrors.login
});

export default connect(mapStateToProps, requestActions)(HeaderContainer)