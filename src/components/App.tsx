import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Thinking } from '../model/engine/State'
import { Store } from '../model/store/Store'
import './App.scss'
import SideInfo from './engine/info/SideInfo'
import BoardArea from './shogi/BoardArea'

interface Props {
  store?: Store
}

@inject('store')
@observer
export default class App extends Component<Props> {
  render(): JSX.Element {
    const { state } = this.props.store!.engineState
    const isThinking: boolean = state === Thinking

    const en = this.renderEngineInfo(isThinking)
    const className = isThinking ? 'App App-SideInfo' : 'App App-BoardOnly'

    return (
      <div className={className}>
        <BoardArea />
        {en}
      </div>
    )
  }

  renderEngineInfo(isThinking: boolean): JSX.Element | undefined {
    if (!isThinking) return
    return <SideInfo />
  }
}
