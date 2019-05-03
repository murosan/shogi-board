import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import { Thinking } from '../model/engine/State'
import { Store } from '../model/store/Store'
import { DefaultStore } from '../store/Store'
import './App.scss'
import SideInfo from './engine/info/SideInfo'
import BoardArea from './shogi/BoardArea'

export default class App extends Component {
  private store: Store = new DefaultStore()

  render(): JSX.Element {
    const { state } = this.store.engineState
    const isThinking: boolean = state === Thinking

    const en = this.renderEngineInfo(isThinking)
    const className = isThinking ? 'App App-SideInfo' : 'App App-BoardOnly'

    return (
      <Provider store={this.store}>
        <div className={className}>
          <BoardArea />
          {en}
        </div>
      </Provider>
    )
  }

  renderEngineInfo(isThinking: boolean): JSX.Element | undefined {
    if (!isThinking) return
    return <SideInfo />
  }
}
