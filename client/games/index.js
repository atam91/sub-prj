import React from 'react'
import Xo from './Xo';
import Kalah from './Kalah';
import Gomoku from './Gomoku';
import Goban from './Goban';

export default {
  xo: (props) => (<Xo {...props} />),
  kalah: (props) => (<Kalah {...props} />),
  gomoku: (props) => (<Gomoku {...props} />),
  goban: (props) => (<Goban {...props} />)
}

export const names = {
  xo: 'Xo',
  kalah: 'Kalah',
  gomoku: 'Gomoku',
  goban: 'Goban'
}
