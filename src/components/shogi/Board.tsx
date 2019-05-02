import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Store } from '../../model/store/Store'
import Controller from '../engine/connection/Controller'
import './Board.scss'
import Cell from './Cell'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class Board extends Component<Props> {
  render() {
    const idx = this.props.store!.gameState.indexes
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
          {this.renderConnector()}
        </div>
      </div>
    )
  }

  renderConnector() {
    const shouldRender = this.props.store!.engineState.controllerIsVisible
    if (shouldRender) return <Controller />
  }
}
