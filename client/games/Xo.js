import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import './xo.css'

const Cell = (x, y, value, active, move, marks) => {
  if (active && !value) {
    return <td key={x} className="available" onClick={move}></td>;
  } else {
    return <td key={x} className={classNames({strike: marks[y][x]})}>{value}</td>;
  }
};

const Board = (state, move, user) => {
  const active = (state.moves != -1) && !state.wins
    && user.name === state.players[state.moves].name;

  const body = 
    state.board.map((row, y) => (<tr key={y}>
      {row.map((cell, x) => Cell(x, y, cell, active, move({ x, y }), state.marks))}
    </tr>));

  return <table className="center">
    <tbody>
      {body}
    </tbody>
  </table>
};

const Player = (state, user, joinAction, number) => {
  const player = state.players[number];

  const join = user.name ?
    <a className="bold" onClick={joinAction(number)}>(join)</a> :
    '(join)';
  const name = player.name || join;
  const wins = state.wins === player.sign && '*wins*';
  const active = !state.wins && number === state.moves && '*';
  const score = player.score || null;
  

  return <div className="text-center">
    <span className={classNames({ bold: wins ? wins : active })}>
      {active}{player.sign}: {name} {wins} {score}
    </span>
  </div>;
};

export default class Xo extends Component {
  render() {
    const { user, state, join, move } = this.props;

    return <div id="xo-game" className="block content sep-b" style={{width: '300px', height: '300px'}}>
      {Player(state, user, join, 0)}
      {Board(state, move, user)}
      {Player(state, user, join, 1)}
    </div>;
  }
}

Xo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  state: PropTypes.object.isRequired,
  join: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired
}