import React, { PropTypes, Component } from 'react'

export default class FooterPanel extends Component {
  render() {
    return <div className="navbar-fixed-bottom">
      <div className="container-fluid">
        <div className="row footer">
            { this.props.children }
        </div>
      </div>
    </div>
  }
}