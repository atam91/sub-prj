import React, { PropTypes, Component } from 'react'
import FooterPanel from './FooterPanel'

export default class Footer extends Component {
  submit(e) {
    e.preventDefault();
    if (this.refs.message.value) {
      this.props.actions.messageSend(this.refs.message.value);
      this.refs.message.value = '';
    }
  }
  render() {
    return <FooterPanel>
      <form className="form" onSubmit={::this.submit}>
        <div className="col-md-10">
          <input type="text" className="form-control" ref="message" placeholder="Message" autofocus />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-default">Отправить</button>
        </div>
      </form>
    </FooterPanel>
  }
}

Footer.propTypes = {
  actions: React.PropTypes.shape({
    messageSend: PropTypes.func.isRequired
  })
}