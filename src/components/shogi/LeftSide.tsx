import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { Gote, Sente } from '../../model/shogi/Turn'
import { Store } from '../../store/GameStateStore'
import Captures from './Captures'
import './LeftSide.scss'

export interface Props {
  store?: Store
}

@inject('store')
@observer
export default class LeftSide extends Component<Props> {
  render() {
    const caps: number[] =
      this.props.store!.indexes[0] === -1
        ? this.props.store!.pos.cap1
        : this.props.store!.pos.cap0

    const isTurn: boolean =
      this.props.store!.indexes[0] === -1
        ? this.props.store!.pos.turn === Gote
        : this.props.store!.pos.turn === Sente

    return (
      <div className="LeftSide">
        <Captures isLeftSide={true} captures={caps} isTurn={isTurn} />
        <div />
      </div>
    )
  }
}
