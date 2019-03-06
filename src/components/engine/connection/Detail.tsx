import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { EngineState } from '../../../model/engine/EngineState'
import { Store } from '../../../store/GameStateStore'
import './Detail.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Detail extends Component<Props> {
  render() {
    const es: EngineState = this.props.store!.engineState
    // TODO
    return (
      <div className="DetailContainer">
        <div>{es.current}</div>
        <div>{JSON.stringify(es.options)}</div>
      </div>
    )
  }
}
