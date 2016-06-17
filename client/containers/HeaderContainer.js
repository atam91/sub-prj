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

const mapStateToProps = (state) => ({
  user: state.connection.user,
  loginError: state.requestErrors.login
});

const mapDispatchToProps = (dispatch) => ({
  requestActions: bindActionCreators(requestActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)