import React, { Component } from 'react'

export default class View extends Component {
  render() {
    return <div className="container">
      <div className="row view">
        { this.props.children }
      </div>
    </div>;
  }
}