import React, { Component } from 'react'
import classNames from 'classnames'
import './xo.css'

const Cell = (x, value, active, move) => {
  if (active && !value) {
    return <td key={x} className="available" onClick={move}></td>;
  } else {
    return <td key={x}>{value}</td>;
  }
};

const Board = (state, move, user) => {
  const active = (state.moves != -1)
    && user.name === state.players[state.moves].name;

  const body = 
    state.board.map((row, y) => (<tr key={y}>
      {row.map((cell, x) => Cell(x, cell, active, move({ x, y })))}
    </tr>));

  return <table className="center">
    <tbody>
      {body}
    </tbody>
  </table>
};

const Player = (state, join, number) => {
  const player = state.players[number];
  const name = player.name || <a onClick={join(number)}>join</a>;
  const active = player.name === state.moves;

  return <div className="text-center">
    <span className={classNames({ bold: active })}>
      {name}: {player.sign}
    </span>
  </div>;
};

export default class Xo extends Component {
  render() {
    const { user, state, join, move } = this.props;


    return <div id="xo-game" className="block content" style={{width: '300px', height: '300px'}}>
      {Player(state, join, 0)}
      {Board(state, move, user)}
      {Player(state, join, 1)}
    </div>;
  }
}