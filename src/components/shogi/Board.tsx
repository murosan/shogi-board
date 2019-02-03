import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Connecting } from '../../model/engine/EngineState'
import { Store } from '../../store/GameStateStore'
import Connector from '../engine/Connector'
import Message from '../util/Message'
import './Board.scss'
import Cell from './Cell'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Board extends Component<Props> {
  render() {
    const idx = this.props.store!.indexes
    const rows = idx.map(r =>
      idx
        .slice()
        .reverse()
        .map(c => <Cell key={r * 10 + c} row={r} column={c} />)
    )

    return (
      <div className="BoardContainer">
        <div className="ResetPseudo">
          <div className="Board">{rows}</div>
          {this.renderAlert()}
          {this.renderConnector()}
        </div>
      </div>
    )
  }

  renderAlert() {
    const msg = this.props.store!.messages
    if (msg.length === 0) return undefined
    return <Message messages={msg} />
  }

  renderConnector() {
    const shouldRender = this.props.store!.engineState.state === Connecting
    if (!shouldRender) return undefined
    return <Connector />
  }
}
