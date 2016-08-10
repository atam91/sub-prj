import React, { PropTypes, Component } from 'react'
import { scrollDown } from '../services/scrollDown'
import { MAIN } from '../../common/constants'

export default class Footer extends Component {
  submit(e) {
    e.preventDefault();
    if (this.refs.message.value) {
      this.props.send(this.refs.message.value, this.props.ui.currentChannel);
      this.refs.message.value = '';
      scrollDown('chat');
    }
  }
  render() {
    const { users, ui } = this.props;
    const channel = ui.currentChannel;

    const disabled = (channel !== MAIN) && (users.indexOf(channel) === -1);

    return <div id="footer">
      <form className="form row-area" onSubmit={::this.submit}>
        <input ref="message" type="text" className="form-control sep-r" placeholder="Message" />
        <button 
          type="submit" 
          className="btn btn-default" 
          disabled={disabled}>
            Send
        </button>
      </form>
    </div>;
  }
}

Footer.propTypes = {
  send: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.string.isRequired),
  ui: PropTypes.shape({
    currentChannel: PropTypes.string.isRequired
  })
}