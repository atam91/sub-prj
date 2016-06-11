import React, { PropTypes, Component } from 'react'

export default class Participants extends Component {
  render() {
    const { list } = this.props;

    if (!list.length) return null;

    return <div className="block">
      Участники: {list.join(', ')}.
    </div>;
  }
}

Participants.propTypes = {
  list: React.PropTypes.arrayOf(PropTypes.string.isRequired)
}