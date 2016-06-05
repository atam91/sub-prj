import React, { PropTypes, Component } from 'react'

export default class HeaderPanel extends Component {
  render() {
    return <div className="navbar-fixed-top">
      <div className="container-fluid">
        <div className="row header">
            { this.props.children }
        </div>
      </div>
    </div>
  }
}