import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import EngineState from '../../model/engine/EngineState'
import { Store } from '../../store/GameStateStore'
import List from './connection/List'
import './Controller.scss'
import Detail from './connection/Detail'

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
    if (s.current === undefined) return <List />
    return <Detail />
  }
}
