import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import GameStateStore, { Store } from '../store/GameStateStore'
import './App.scss'
import BoardArea from './shogi/BoardArea'
import Message from './util/Message'

export default class App extends Component {
  private store: Store = new GameStateStore()

  render() {
    const msg = this.store.messages
    const alert = msg.length === 0 ? undefined : <Message messages={msg} />

    return (
      <Provider store={this.store}>
        <div className="App App-BoardOnly">
          <BoardArea />
          {alert}
        </div>
      </Provider>
    )
  }
}
