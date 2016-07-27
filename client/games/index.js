import React from 'react'
import Xo from './Xo';
import Kalah from './Kalah';
import Gomoku from './Gomoku';

export default {
  xo: (id, user, state, join, move) => (
    <Xo key={id} user={user} state={state} join={join} move={move} />
  ),
  kalah: (id, user, state, join, move) => (
    <Kalah key={id} user={user} state={state} join={join} move={move} />
  ),
  gomoku: (id, user, state, join, move) => (
    <Gomoku key={id} user={user} state={state} join={join} move={move} />
  )
}

export const names = {
  xo: 'Xo',
  kalah: 'Kalah',
  gomoku: 'Gomoku'
}