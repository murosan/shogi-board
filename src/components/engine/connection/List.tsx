import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  Connecting,
  NotConnected,
  State,
} from '../../../model/engine/EngineState'
import { ShogiBoardClient } from '../../../proto/factory'
import { Store } from '../../../store/GameStateStore'
import Loader from '../../util/Loader'
import './List.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class List extends Component<Props> {
  render() {
    const { names, current, state } = this.props.store!.engineState
    return names.map((name, i) => {
      const isCurrent: boolean = name === current
      const loading: boolean = isCurrent && state === Connecting
      const loader = loading ? <Loader /> : undefined
      return (
        <div
          className="ListEngineName"
          key={i}
          onClick={() => this.setCurrentEngine(name, state)}
        >
          {loader}
          <span>{name}</span>
        </div>
      )
    })
  }

  async setCurrentEngine(name: string, state: State): Promise<void> {
    if (state !== NotConnected) return
    this.props.store!.setCurrentEngine(name)
  }

  componentWillMount() {
    new ShogiBoardClient()
      .initialize()
      .then((list: string[]) => this.props.store!.setEngineNames(list))
      .catch(err => {
        const msg = 'Failed to initialize.'
        console.error(msg, err)
        this.props.store!.unsetCurrentEngine()
        this.props.store!.setMessages([msg])
      })
  }
}
