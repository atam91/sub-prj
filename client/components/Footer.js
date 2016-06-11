import React, { PropTypes, Component } from 'react'

export default class Footer extends Component {
  submit(e) {
    e.preventDefault();
    if (this.refs.message.value) {
      this.props.requestActions.send(this.refs.message.value);
      this.refs.message.value = '';
      this.props.scrollDown();
    }
  }
  render() {
    return <div className="footer">
      <form className="form row-area" onSubmit={::this.submit}>
        <input ref="message" type="text" className="form-control separate" placeholder="Message" />
        <button type="submit" className="btn btn-default">Отправить</button>
      </form>
    </div>;
  }
}

Footer.propTypes = {
  requestActions: React.PropTypes.shape({
    send: PropTypes.func.isRequired
  }),
  scrollDown: PropTypes.func.isRequired
}