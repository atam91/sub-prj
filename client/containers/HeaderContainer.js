import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import * as headerActions from '../actions/HeaderActions'

class HeaderContainer extends Component {
  render() {
    return <Header {  ...this.props } />;
  }
}

function mapStateToProps (state) {
  return {
    user: state.connection.user,
    loginError: state.requestErrors.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    headerActions: bindActionCreators(headerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)