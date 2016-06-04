import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import HeaderPanel from '../components/HeaderPanel'
import FooterPanel from '../components/FooterPanel'
import Participants from '../components/Participants'
import * as pageActions from '../actions/PageActions'
import * as userActions from '../actions/UserActions'

class App extends Component {
  render() {
    const { user, page, participants } = this.props
    const { getPhotos } = this.props.pageActions
    const { loginRequest, logoutRequest } = this.props.userActions

    var footer;
    if (user.name) {
      footer = <FooterPanel />
    }

    return <div>
      <HeaderPanel user={user} login={loginRequest} logout={logoutRequest} />
      <div className="container">
        <div className="row small-v-padding">
          <Participants {...participants} />
        </div>
      </div>
      {footer}
    </div>
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    page: state.page,
    participants: state.participants
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)