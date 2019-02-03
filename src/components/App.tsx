import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import GameStateStore, { Store } from '../store/GameStateStore'
import './App.scss'
import BoardArea from './shogi/BoardArea'

export default class App extends Component {
  private store: Store = new GameStateStore()

  render() {
    return (
      <Provider store={this.store}>
        <div className="App App-BoardOnly">
          <BoardArea />
        </div>
      </Provider>
    )
  }
}
