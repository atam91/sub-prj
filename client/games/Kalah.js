import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import { boardMap } from '../../common/games/kalah'
import './kalah.css'

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

  addRoundCircles(units, r1, 6, tens * Math.PI / 6, !tens);
  addRoundCircles(tens, r0, 5);

  if (tens) {
    circles.push(<circle cx={cx} cy={cy} r={r1} style={{stroke: 'black', strokeWidth: 1}} fill="none" />);
  }

  return <svg height="85" width="85">
    <circle cx={cx} cy={cy} r={r} style={{stroke: 'black', strokeWidth: 2}} fill="none" />
    {circles}
  </svg>;
};


export default class Kalah extends Component {
  player(number) {
    const { state, user, join } = this.props;
    const player = state.players[number];

    const joinButton = user.name ?
      <a className="bold" onClick={join(number)}>(join)</a> :
      '(join)';
    const name = player.name || joinButton;
    const wins = state.wins === player.sign && '*wins*';
    const active = !state.wins && number === state.moves && '*';
    const score = player.score || null;
    

    return <div className="text-center">
      <span className={classNames({ bold: wins ? wins : active })}>
        {active}{name} {wins} {score}
      </span>
    </div>;
  }

  td(index) {
    const { state, user, move } = this.props;

    const available = 
      (state.moves != -1) && !state.wins
        &&
      user.name === state.players[state.moves].name
        &&
      boardMap[index] === state.players[state.moves].sign
        &&
      state.animation.finished && state.board[index];

    let onClick;
    if (available) {
      onClick = move({ index });
    }

    return <td key={index} className={classNames({ available })} onClick={onClick}>
      {Pit(state.board[index])}
    </td>;
  }

  board() {
    const { state, move } = this.props;
    const { board } = state;

    return <table className="center">
      <tbody>
        <tr>
          {this.td(1)}
          {this.td(0)}
          {this.td(13)}
        </tr>
        <tr>
          {this.td(2)}
          <td></td>
          {this.td(12)}
        </tr>
        <tr>
          {this.td(3)}
          <td></td>
          {this.td(11)}
        </tr>
        <tr>
          {this.td(4)}
          <td></td>
          {this.td(10)}
        </tr>
        <tr>
          {this.td(5)}
          <td></td>
          {this.td(9)}
        </tr>
        <tr>
          {this.td(6)}
          {this.td(7)}
          {this.td(8)}
        </tr>
      </tbody>
    </table>;
  }

  render() {
    const { user, state, join, move } = this.props;

    return <div id="kalah-game" className="block content sep-b">
      {this.player(0)}
      {this.board()}
      {this.player(1)}
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