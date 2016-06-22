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

const Player = (state, join, number) => {
  const player = state.players[number];
  const name = player.name || <a onClick={join(number)}>join</a>;

  return <div className="text-center">
    <span className={classNames({ bold: 0 })}>
      {name}: {player.sign}
    </span>
  </div>;
};

export default class Xo extends Component {
  render() {
    const { user, state, request, join } = this.props;


    return <div id="xo-game" className="block content" style={{width: '300px', height: '300px'}}>
      {Player(state, join, 0)}
      {Field()}
      {Player(state, join, 1)}
    </div>;
  }
}