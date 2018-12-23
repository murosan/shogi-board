import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.scss'
import GameState from './model/shogi/GameState'
import { newGameState } from './model/shogi/GameStateInit'

const gs: GameState = newGameState()

ReactDOM.render(<App gs={gs} />, document.getElementById('root'))
