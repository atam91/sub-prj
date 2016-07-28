import React from 'react'
import Xo from './Xo';
import Kalah from './Kalah';
import Gomoku from './Gomoku';

export default {
  xo: (props) => (<Xo {...props} />),
  kalah: (props) => (<Kalah {...props} />),
  gomoku: (props) => (<Gomoku {...props} />)
}

export const names = {
  xo: 'Xo',
  kalah: 'Kalah',
  gomoku: 'Gomoku'
}