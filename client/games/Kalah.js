import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import './kalah.css'

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
      {active}{name} {wins} {score}
    </span>
  </div>;
};

const Pit = (count) => {
  const cx = 42.5;
  const cy = cx;
  const r = 40;

  const circles = [];
  const addRoundCircles = (count, rRound, r, delta = 0, inner = true) => {
    const angle = 2 * Math.PI / count;

    if (count === 1 && inner) {
      circles.push(<circle cx={cx} cy={cy} r={r} />);
    } else {
      for (let i = 0; i < count; i++) {
        let cxx = cx + rRound * Math.cos(angle * i + delta);
        let cyy = cy + rRound * Math.sin(angle * i + delta);
        circles.push(<circle cx={cxx} cy={cyy} r={r} />);
      }
    }
  };
  
  const r0 = 11;
  const r1 = 25;

  const tens = parseInt(count / 10);
  const units = count % 10;

  addRoundCircles(units, r1, 6, tens, !tens);
  addRoundCircles(tens, r0, 5);

  if (tens) {
    circles.push(<circle cx={cx} cy={cy} r={r1} style={{stroke: 'black', 'stroke-width': 1}} fill="none" />);
  }

  return <svg height="85" width="85">
    <circle cx={cx} cy={cy} r={r} style={{stroke: 'black', 'stroke-width': 2}} fill="none" />
    {circles}
  </svg>;
}

const Td = (state, index) => (
  <td>{Pit(state.board[index])}</td>
);

const Board = (state, move, user) => {
  const {board} = state;
  return <table className="center">
    <tbody>
      <tr>
        {Td(state, 1)}
        {Td(state, 0)}
        {Td(state, 13)}
      </tr>
      <tr>
        {Td(state, 2)}
        <td></td>
        {Td(state, 12)}
      </tr>
      <tr>
        {Td(state, 3)}
        <td></td>
        {Td(state, 11)}
      </tr>
      <tr>
        {Td(state, 4)}
        <td></td>
        {Td(state, 10)}
      </tr>
      <tr>
        {Td(state, 5)}
        <td></td>
        {Td(state, 9)}
      </tr>
      <tr>
        {Td(state, 6)}
        {Td(state, 7)}
        {Td(state, 8)}
      </tr>
    </tbody>
  </table>

};

export default class Kalah extends Component {
  render() {
    const { user, state, join, move } = this.props;

    return <div id="kalah-game" className="block content sep-b" style={{width: '300px', height: '600px'}}>
      {Player(state, user, join, 0)}
      {Board(state, move, user)}
      {Player(state, user, join, 1)}
    </div>;
  }
}

Kalah.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  state: PropTypes.object.isRequired,
  join: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired
}