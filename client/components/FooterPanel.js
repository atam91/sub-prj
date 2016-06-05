import React, { PropTypes, Component } from 'react'

export default class FooterPanel extends Component {
  render() {
    return <div className="navbar-fixed-bottom row-fluid">
      <div className="navbar-inner footer">
        <div className="container">
          <div className="row">
            { this.props.children }
          </div>
        </div>
      </div>
    </div>
  }
}