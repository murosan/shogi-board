import { Error } from 'grpc-web'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import EngineState from '../../model/engine/EngineState'
import { client, newRequest } from '../../proto/factory'
import { EngineNames } from '../../proto/v1_pb'
import { Store } from '../../store/GameStateStore'
import './Connector.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Connector extends Component<Props> {
  render() {
    const state: EngineState = this.props.store!.engineState
    const names = state.names.map((n, i) => (
      <div className="EngineName" key={i}>
        {n}
      </div>
    ))
    return <div className="ConnectorBoard">{names}</div>
  }

  componentWillMount() {
    const req = newRequest()
    client().getEngineNames(req, {}, (err: Error, res: EngineNames) => {
      if (err) {
        const msg = 'Failed to exec getEngineNames.'
        console.error(msg, err)
        this.props.store!.disconnectEngine()
        this.props.store!.setMessages([msg])
        return
      }
      this.props.store!.setEngineNames(res.getEnginesList())
    })
  }
}
