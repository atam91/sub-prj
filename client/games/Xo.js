import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import './xo.css'

export default class Xo extends Component {
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
        {active}{player.sign}: {name} {wins} {score}
      </span>
    </div>;
  }

  board() {
    const { state } = this.props;

    return <table className="center">
      <tbody>
        {state.board.map(::this.row)}
      </tbody>
    </table>;
  }

  row(row, y) {
    return <tr key={y}>
      {row.map((value, x) => this.cell(x, y))}
    </tr>;
  }

  cell(x, y) {
    const { state, move, user } = this.props;

    const value = state.board[y][x];
    const active = (state.moves != -1) && !state.wins
      && user.name === state.players[state.moves].name;

    if (active && !value) {
      return <td key={x} className="available" onClick={move({x, y})}></td>;
    } else {
      return <td key={x} className={classNames({strike: state.marks[y][x]})}>{value}</td>;
    }
  }

  render() {
    const { user, state, join, move } = this.props;

    return <div id="xo-game" className="block content sep-b">
      {this.player(0)}
      {this.board()}
      {this.player(1)}
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