import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from '../components/Footer'
import * as footerActions from '../actions/FooterActions'

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
    actions: bindActionCreators(footerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer)