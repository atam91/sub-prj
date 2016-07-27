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

  start(game) {
    return () => this.props.startGame(game, this.props.channel);
  }

  doRestartGame(id) {
    return () => {
      this.props.restartGame(id);
    };
  }
  
  render() {
    const { user, gameId, gameState } = this.props;
    const error = !this.state.resetError && this.props.loginError;

    let gamePanel;
    if (gameId && gameState && gameState.players.some(p => p.name === user.name)) {
      gamePanel = <div className="left">
        <a className="btn btn-default sep-r" onClick={this.doRestartGame(gameId)}>Restart</a>
      </div>;
    }

    let panel,loginForm;
    if (user.auth) {
      panel = <div>
        <div className="left">
          <div className="dropdown">
            <a className="btn btn-default sep-r">Start</a>
            <div className="dropdown-content">
              <a onClick={::this.start('xo')}>Xo</a>
              <a onClick={::this.start('kalah')}>Kalah</a>
              <a onClick={::this.start('gomoku')}>Gomoku</a>
            </div>
          </div>
        </div>
        {gamePanel}
        <div className="right">
          <span className="sep-r">Hi, {user.name}!</span>
          <a className="btn btn-default" onClick={::this.logout}>Logout</a>
        </div>
      </div>;
    } else {
      loginForm = <form className={classNames('form-signin', 'login-form', { 'has-error': error })} onSubmit={::this.submit}>
        <input ref="username"  onChange={::this.change} type="text" className="form-control" placeholder="nickname" />
        <span id="helpBlock" className="help-block">{error}</span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
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
  channel: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired
}