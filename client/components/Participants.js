import React, { PropTypes, Component } from 'react'

export default class Participants extends Component {
  render() {
    const { list } = this.props;

    if (!list.length) return null;

    const items = list.map((name) => {
      return <span className="sep label label-default" key={name}>{name}</span>;
    });

    return <div id="participants" className="block content separate">
      {items}
    </div>;
  }
}

Participants.propTypes = {
  list: React.PropTypes.arrayOf(PropTypes.string.isRequired)
}