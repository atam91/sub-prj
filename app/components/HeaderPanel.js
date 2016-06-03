import React, { PropTypes, Component } from 'react'

export default class HeaderPanel extends Component {
  submit(e) {
    e.preventDefault();
    this.props.login(this.refs.username.value);
  }
  render() {
    const { name } = this.props.user;

    var panel,loginForm;
    if (name) {
      panel = <span>{name} <a>(logout)</a></span>;
    } else {
      loginForm = <form className="form-signin {{(error) ? 'has-error' : ''}}" onSubmit={::this.submit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        <label for="inputNickname" className="sr-only">Nickname</label>
        <input ref="username" type="text" id="inputNickname" className="form-control has-error" placeholder="nickname" />
        <span id="helpBlock" className="help-block">error</span>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>;
    }

    return <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">{loginForm}</div>
        <div className="col-md-4">{panel}</div>
      </div>
    </div>;
  }
}

HeaderPanel.propTypes = {
  user: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}