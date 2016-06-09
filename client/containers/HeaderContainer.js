import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import requestActions from '../actions/RequestActions'

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
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)