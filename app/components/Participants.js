import React, { PropTypes, Component } from 'react'

export default class Participants extends Component {
  render() {
    const { list } = this.props;
    var text;

    if (list.length) {
      text = `Участники: ${list.join(', ')}.`
    }

    return <p>{text}</p>
  }
}

Participants.propTypes = {
  list: PropTypes.array.isRequired
}