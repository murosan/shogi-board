import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { ShogiBoardClient } from '../../../proto/factory'
import { Store } from '../../../store/GameStateStore'
import './List.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class List extends Component<Props> {
  render() {
    return this.props.store!.engineState.names.map((n, i) => (
      <div
        className="ListEngineName"
        key={i}
        onClick={() => this.setCurrentEngine(n)}
      >
        {n}
      </div>
    ))
  }

  async setCurrentEngine(name: string): Promise<void> {
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
