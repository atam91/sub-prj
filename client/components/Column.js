import React, { Component } from 'react'

export default class Column extends Component {
  render() {
    return <div className="column-area">
      { this.props.children }
    </div>;
  }
}