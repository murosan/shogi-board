import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../model/store/Store'
import { DefaultStore } from '../store/Store'
import './App.scss'
import BoardArea from './shogi/BoardArea'

export default class App extends Component {
  private store: Store = new DefaultStore()

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
