import React, { PropTypes, Component } from 'react'

export default class Footer extends Component {
  render() {
    return <div className="navbar-fixed-bottom row-fluid">
      <div className="navbar-inner footer">
        <div className="container">
          <div className="row">
            <form className="form">
              <div className="col-md-10">
                <input type="text" className="form-control" placeholder="Message" autofocus />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-default">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  }
}