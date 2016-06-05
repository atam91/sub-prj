import React, { PropTypes, Component } from 'react'

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      scrollTop: 0
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.refs.chat.scrollHeight != prevState.scrollTop) {
      this.setState({
        scrollTop: this.refs.chat.scrollHeight
      });
    }
  }
  render() {
    const { list } = this.props;

    const items = list.map( ({ id, name, text }) => {
      return <li key={id}><b>{name}:</b> {text}</li>;
    });

    return <ul className="chat" ref="chat" scrollTop={this.state.scrollTop}>{items}</ul>;
  }
}

Chat.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }))
}