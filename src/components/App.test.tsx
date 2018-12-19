import React from 'react'
import ReactDOM from 'react-dom'
import { newGameState } from '../model/shogi/GameStateInit'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App gs={newGameState()} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
