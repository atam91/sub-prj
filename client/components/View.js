import React, { Component } from 'react'

export default class View extends Component {
  render() {
    return <div id="main" className="block flexbox-item-grow row-area">
      { this.props.children }
    </div>;
  }
}