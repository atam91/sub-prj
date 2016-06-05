import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from '../components/Footer'

class FooterContainer extends Component {
  render() {
    if (!this.props.user.auth) return null;

    return <Footer {...this.props} />;
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(FooterContainer)