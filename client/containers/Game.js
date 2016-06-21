import React, { Component } from 'react'
import { connect } from 'react-redux'
import Xo from '../games/Xo'

class Game extends Component {
  render() {
    const { user } = this.props;

    return <div className="sep-r">
      <Xo user={user} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.connection.user,
  state: 1,
  request: 2
});

export default connect(mapStateToProps)(Game)