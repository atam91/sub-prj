import React, { Component } from 'react'
import classNames from 'classnames'
import './xo.css'

const Field = (field) => (
  <table className="center">
    <tbody>
      <tr>
        <td className="available"></td>
        <td className="available">O</td>
        <td className="available">X</td>
      </tr>
      <tr>
        <td>O</td>
        <td>X</td>
        <td>X</td>
      </tr>
      <tr>
        <td></td>
        <td>O</td>
        <td>X</td>
      </tr>
    </tbody>
  </table>
);

const Player = (name, sign, active = false) => (
  <div className="text-center">
    <span className={classNames({ bold: active })}>
      {name}: {sign}
    </span>
  </div>
);

export default class Xo extends Component {
  render() {
    const { user, state, request } = this.props;


    return <div id="xo-game" className="block content" style={{width: '300px', height: '300px'}}>
      {Player(user.name || 'player1', 'X', true)}
      {Field()}
      {Player('player2', 'O')}
    </div>;
  }
}