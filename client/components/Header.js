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
    this.props.requestActions.login(this.refs.username.value);
    this.setState({ resetError: false });
  }
  change() {
    this.setState({ resetError: true });
  }
  logout() {
    this.props.requestActions.logout();
  }
  render() {
    const { name } = this.props.user;
    const error = !this.state.resetError && this.props.loginError;
    const errorClass = error ? 'has-error' : null;

    var panel,loginForm;
    if (name) {
      panel = <div className="right">
        <span className="separate">Привет, {name}!</span>
        <a className="btn btn-default" onClick={::this.logout}>Выйти</a>
      </div>;
    } else {
      loginForm = <form className={classNames('form-signin', 'login-form', errorClass)} onSubmit={::this.submit}>
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
  loginError: PropTypes.string.isRequired,
  requestActions: React.PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  })
}