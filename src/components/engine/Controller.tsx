import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  EngineState,
  NotConnected,
  Connecting,
} from '../../model/engine/EngineState'
import { Store } from '../../store/GameStateStore'
import Detail from './connection/Detail'
import List from './connection/List'
import './Controller.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Controller extends Component<Props> {
  render() {
    const engineState: EngineState = this.props.store!.engineState

    return (
      <div className="ControllerBoard">
        {this.renderChildPanel(engineState)}
      </div>
    )
  }

  renderChildPanel(s: EngineState) {
    if (s.state === NotConnected || s.state === Connecting) return <List />
    return <Detail />
  }
}
