# sub-prj
React\Redux Socket.IO Application.
Chat with private messaging & Games: Tictactoe, Gomoku, Kalah.
![screenshot](https://cloud.githubusercontent.com/assets/4473491/17136402/a4c9aa5a-5324-11e6-8fdf-3f2781c03069.png)

## About
The project provides a platform for implementing small multiplayer games without any network coding.

|   Game    | Server logic LOC | React component LOC | CSS LOC |
|----------:|:----------------:|:-------------------:|:-------:|
| Tictactoe |        95        |          74         |    28   |
| Gomoku    |       181        |          74         |    34   |
| Kalah     |       174        |         147         |    22   |



## Use Guide
At first `npm install`

### Development
    npm run dev                     ## for development app server
    npm run dev-server              ## for development app client
Browse `localhost:3333`

### Production
    npm run build                   ## to build app client
    PORT=80 npm start               ## to run app server (client hosted thru this app server)
Browse `localhost:80`



## Creating your own game
### Server logic
You must implement these methods at `./common/games/%game_name%.js`:
- initState
- join
- move
- restart
- getData

You can reuse some base logic @see example games code.

Define game at `./common/games/index.js`.


### Client logic
You must implement game react component at `./client/games/%game_name%.js` and styles at `./client/games/%game_name%.css`.

Define game component at `./client/games/index.js`.

After all, you can add game execution at `./client/components/Header.js` (Start button dropdown-content).
