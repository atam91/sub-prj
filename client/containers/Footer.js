import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Footer from '../components/Footer'
import actions from '../actions'

class FooterContainer extends Component {
  render() {
    if (!this.props.user.auth) return null;

    return <Footer {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  users: state.common.users,
  ui: state.ui
});

export default connect(mapStateToProps, actions)(FooterContainer)