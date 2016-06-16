import React, { Component } from 'react'

export default class Column extends Component {
  render() {
    return <div className="flexbox-item-grow column-area">
      { this.props.children }
    </div>;
  }
}