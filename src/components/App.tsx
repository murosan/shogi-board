import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import GameStateStore from '../store/GameStateStore'
import './App.scss'
import BoardArea from './shogi/BoardArea'

export default class App extends Component {
  private gs: GameStateStore = new GameStateStore()

  render() {
    return (
      <Provider gs={this.gs}>
        <div className="App App-BoardOnly">
          <BoardArea />
        </div>
      </Provider>
    )
  }
}
