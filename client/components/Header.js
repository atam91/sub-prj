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
    this.props.login(this.refs.username.value);
    this.setState({ resetError: false });
  }
  change() {
    this.setState({ resetError: true });
  }
  logout() {
    this.props.logout();
  }
  startXo() {
    this.props.startGame('xo');
  }
  render() {
    const { name } = this.props.user;
    const error = !this.state.resetError && this.props.loginError;

    var panel,loginForm;
    if (name) {
      panel = <div>
        <div className="left">
          <a className="btn btn-default" onClick={::this.startXo}>Xo</a>
        </div>
        <div className="right">
          <span className="sep-r">Привет, {name}!</span>
          <a className="btn btn-default" onClick={::this.logout}>Выйти</a>
        </div>
      </div>;
    } else {
      loginForm = <form className={classNames('form-signin', 'login-form', { 'has-error': error })} onSubmit={::this.submit}>
        <input ref="username"  onChange={::this.change} type="text" className="form-control" placeholder="nickname" />
        <span id="helpBlock" className="help-block">{error}</span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
      </form>;
    }

    return <div className="header">

      {loginForm}
      {panel}
    </div>;
  }
}

Header.propTypes = {
  user: React.PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired
}