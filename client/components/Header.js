import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      resetError: false
    };
  }
  submit(e) {
    e.preventDefault();
    this.props.headerActions.loginRequest(this.refs.username.value);
    this.setState({ resetError: false });
  }
  change() {
    this.setState({ resetError: true });
  }
  logout() {
    this.props.headerActions.logoutSend();
  }
  render() {
    const { name } = this.props.user;
    const error = !this.state.resetError && this.props.user.error;
    const errorClass = error ? 'has-error' : null;

    var panel,loginForm;
    if (name) {
      panel = <div>
        <span className="separate">Привет, {name}!</span>
        <a className="btn btn-default" onClick={::this.logout}>Выйти</a>
      </div>;
    } else {
      loginForm = <form className={classNames('form-signin', errorClass)} onSubmit={::this.submit}>
        <input ref="username" type="text" className={classNames('form-control', errorClass)} placeholder="nickname" onChange={::this.change} />
        <span id="helpBlock" className="help-block">{error}</span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
      </form>;
    }

    return <div className="container-fluid header">
      <div className="row-fluid">
        <div className="col-md-4"></div>
        <div className="col-md-4">{loginForm}</div>
        <div className="col-md-4">{panel}</div>
      </div>
    </div>;
  }
}

Header.propTypes = {
  user: React.PropTypes.shape({
    name: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  }),
  headerActions: React.PropTypes.shape({
    loginRequest: PropTypes.func.isRequired,
    logoutSend: PropTypes.func.isRequired
  })
}