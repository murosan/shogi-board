import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../store/GameStateStore'
import Controller from '../engine/connection/Controller'
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
    // TODO: なくす
    const msg = this.props.store!.messages
    if (msg.length !== 0) return <Message messages={msg} />
  }

  renderConnector() {
    const shouldRender = this.props.store!.engineControllerIsVisible
    if (shouldRender) return <Controller />
  }
}
