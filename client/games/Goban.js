import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import './goban.css'

const STATE_SETTINGS = 'STATE_SETTINGS';
const STATE_PREPARING = 'STATE_PREPARING';
const STATE_PLAYING = 'STATE_PLAYING';
const STATE_SCORING = 'STATE_SCORING';

export default class Gomoku extends Component {
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

        return <td key={x} className={classNames('color-' + value)}></td>;
    }

    desk() {
        const { state } = this.props;

        if (state.state === STATE_SETTINGS) {
            return this.settings();
        } else {
            return this.board();
        }
    }

    settings() {
        const { move } = this.props;

        return <div>
            <button onClick={move({ size: 9 })}>9x9</button>
            <button onClick={move({ size: 13 })}>13x13</button>
            <button onClick={move({ size: 19 })}>19x19</button>
        </div>
    }

    render() {
        const { user, state, join, move } = this.props;

        return <div id="goban-game" className="block content sep-b">
            {this.player(0)}
            {this.desk()}
            {this.player(1)}
        </div>;
    }
}

Gomoku.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired
    }),
    state: PropTypes.object.isRequired,
    join: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired
}
