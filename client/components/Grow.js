import React, { Component } from 'react'

export default class Grow extends Component {
  render() {
    return <div className="flexbox-item-grow">
      { this.props.children }
    </div>;
  }
}