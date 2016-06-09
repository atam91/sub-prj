import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from '../components/Footer'
import requestActions from '../actions/RequestActions'

class FooterContainer extends Component {
  render() {
    if (!this.props.user.auth) return null;

    return <Footer {...this.props} />;
  }
}

function mapStateToProps (state) {
  return {
    user: state.connection.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestActions: bindActionCreators(requestActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer)