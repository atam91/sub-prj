import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

export default class ScrollingContent extends Component {
  componentWillUpdate() {
    const content = this.refs.content;
    const computedStyle = getComputedStyle(ReactDOM.findDOMNode(content));

    const scrollWithOffset = content.scrollTop + content.offsetHeight
      - parseInt(computedStyle.borderTopWidth)    //maybe WRONG!!! but it works now
      - parseInt(computedStyle.borderBottomWidth);

    this.shouldScrollBottom = 
      content.offsetHeight && (content.scrollHeight === scrollWithOffset);
  }
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.refs.content.scrollTop = this.refs.content.scrollHeight;
    }
  }
}
